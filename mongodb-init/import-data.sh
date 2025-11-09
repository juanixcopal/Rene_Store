#!/bin/bash
echo "⏳ Esperando a que MongoDB esté listo..."
until mongosh --host mongodb --eval "print('MongoDB está listo')" &> /dev/null; do
  sleep 2
done

echo "✅ MongoDB está listo. Importando datos..."
for file in /docker-entrypoint-initdb.d/*.json; do
  collection=$(basename "$file" .json)
  mongoimport --host mongodb --db renielstore --collection "$collection" --file "$file" --jsonArray
  echo "✅ $collection importados"
done
