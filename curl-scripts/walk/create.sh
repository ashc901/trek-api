API="http://localhost:4741"
URL_PATH="/walks"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "walk": {
      "startPoint": "'"${SP}"'",
      "endPoint": "'"${EP}"'",
      "distance": "'"${DISTANCE}"'"
    }
  }'

echo
