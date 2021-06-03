API="http://localhost:4741"
URL_PATH="/walks"
# TOKEN="0cfaccdc3c209629db692be2c6bdc009" sh curl-scripts/walk/index.sh

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
