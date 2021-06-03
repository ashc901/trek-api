API="http://localhost:4741"
URL_PATH="/walks"
#  TOKEN="0cfaccdc3c209629db692be2c6bdc009" STARTPOINT="aaa" ENDPOINT="Bb" DISTANCE=2 sh curl-scripts/walk/create.sh 

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "walk": {
      "startPoint": "'"${STARTPOINT}"'",
      "endPoint": "'"${ENDPOINT}"'",
      "distance": "'"${DISTANCE}"'"
    }
  }'

echo
