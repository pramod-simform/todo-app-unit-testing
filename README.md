# Todo Application

## Run app
```bash
    git clone https://github.com/pramod-simform/todo-app-unit-testing.git
    cd todo-app-unit-testing
    docker-compose up
```

| API |
| ------- |
| `http://localhost/api` | 

---

## API Reference

#### Get all todos
```http
GET /api/todo
```

#### Get single todo
```http
GET /todo/:id
```
| Parameter | Type     | 
| --------- | -------- |
| `id`      | `string` |

#### Add todo
```http
POST /todo
```
```javascript
{
    "content": "string"
}
```

#### Update todo
```http
PUT /todo/:id
```
```javascript
{
    "content": "string"
}
```
| Parameter | Type     | 
| --------- | -------- |
| `id`      | `string` |

#### Delete todo
```http
DELETE  /todo/:id
```
| Parameter | Type     | 
| --------- | -------- |
| `id`      | `string` |

---
## Tech Stack

**Server:** Nginx
<br>
**API:** Node, Express, MongoDB
