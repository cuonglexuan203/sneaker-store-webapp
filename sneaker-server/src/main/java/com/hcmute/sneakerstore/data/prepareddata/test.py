from faker import Faker
import json

# Initialize Faker
fake = Faker()

# Generate 20 mock user data with nested address
mock_users = []
for _ in range(20):
    user = {
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "email": fake.email(),
        "gender": fake.boolean(),  # True or False for gender
        "birthday": fake.date_of_birth(minimum_age=18, maximum_age=70).strftime(
            "%Y-%m-%d"
        ),
        "phoneNumber": fake.phone_number(),
        "address": {
            "country": "United States",
            "city": fake.city(),
            "district": fake.street_address(),
        },
    }
    mock_users.append(user)

# Convert to JSON
json_data = json.dumps(mock_users, indent=4)
print(json_data)
