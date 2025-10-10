import requests
fpath = r'D:\PROJECTS\AI Food Recipe Genarator\backend\static\uploads\food-ingredient.jpg'
url = 'http://127.0.0.1:8001/upload'
with open(fpath,'rb') as f:
    r = requests.post(url, files={'file': f})
    try:
        print('STATUS', r.status_code)
        print(r.json())
    except Exception as e:
        print('RAW', r.text)
