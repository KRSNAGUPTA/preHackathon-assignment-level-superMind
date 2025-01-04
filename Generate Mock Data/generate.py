import random
import uuid
import csv

post_types = ["Carousel", "Reels", "Static Image"]

data_count = 50

mock_data = []

for _ in range(data_count):
    post_type = random.choice(post_types)
    likes = random.randint(50, 500)
    shares = random.randint(5, 100)
    comments = random.randint(1, 50)
    
    post_data = {
        "post_id": str(uuid.uuid4()),
        "post_type": post_type,
        "likes": likes,
        "shares": shares,
        "comments": comments
    }
    
    mock_data.append(post_data)

with open("mock_social_engagement_data.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["post_id", "post_type", "likes", "shares", "comments"])
    writer.writeheader()
    writer.writerows(mock_data)

print("Mock data generated and saved to 'mock_social_engagement_data.csv'")
