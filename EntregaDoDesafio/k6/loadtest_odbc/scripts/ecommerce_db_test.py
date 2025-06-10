import os
import pyodbc
import random
import time
import sys

def get_db_connection():
    return pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        f'SERVER={os.getenv("DB_HOST", "sql-server")};'
        f'DATABASE={os.getenv("DB_NAME", "master")};'
        f'UID={os.getenv("DB_USER", "sa")};'
        f'PWD={os.getenv("DB_PASSWORD", "123456")};'
        'Encrypt=yes;'
    )

def test_black_friday_scenario(should_checkout=False):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # 1. Consulta ao catálogo de produtos
        start_time = time.time()
        cursor.execute("""
            SELECT p.id, p.nome, p.preco, e.quantidade 
            FROM produtos p
            JOIN estoque e ON p.id = e.produto_id
            WHERE p.em_promocao = 1
            ORDER BY p.preco DESC
        """)
        produtos = cursor.fetchall()
        print(f"Catálogo de promoções: {len(produtos)} produtos encontrados em {time.time() - start_time:.2f}s")

        # 2. Simulação de checkout (apenas se should_checkout=True)
        if should_checkout and produtos:
            produto_escolhido = random.choice(produtos)
            start_time = time.time()
            
            cursor.execute("""
                INSERT INTO pedidos (cliente_id, produto_id, quantidade, total)
                VALUES (?, ?, ?, ?)
            """, 101, produto_escolhido[0], 1, produto_escolhido[2])
            
            cursor.execute("""
                UPDATE estoque 
                SET quantidade = quantidade - 1 
                WHERE produto_id = ?
            """, produto_escolhido[0])
            
            conn.commit()
            print(f"Pedido realizado para {produto_escolhido[1]} em {time.time() - start_time:.2f}s")

    except Exception as e:
        print(f"Falha crítica: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    should_checkout = "--checkout" in sys.argv  # Ex: python ecommerce_db_test.py --checkout
    test_black_friday_scenario(should_checkout)