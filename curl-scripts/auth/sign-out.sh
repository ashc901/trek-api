#!/bin/bash
# TOKEN="9c93d8bbd82a795bc22fe6e03c83e29b" sh curl-scripts/auth/sign-out.sh

API="http://localhost:4741"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
