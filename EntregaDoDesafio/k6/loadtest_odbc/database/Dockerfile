FROM mcr.microsoft.com/mssql/server:2019-latest

# Copia o script de inicialização do banco
COPY init.sql /docker-entrypoint-initdb.d/

# Permissões para o script
USER root
RUN chmod +x /docker-entrypoint-initdb.d/init.sql
USER mssql