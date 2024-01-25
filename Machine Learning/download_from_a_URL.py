from urllib import request
path_to_dataset = 'https://d1u36hdvoy9y69.cloudfront.net/cs-171-intro-to-ml/me_linkedin.jpg'
response = request.urlretrieve(path_to_dataset, "test_image.jpg")