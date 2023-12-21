- [x] create course
- [x] create category
- [x] Retrieve category
- [x] review model
- [x] error handling
- [x] get paginate and filtered course , sort and paginate
- [x] create review
- [x] update a course 
- [x] get course by id with reviews
- [x] get the best course based on avarage review
- [x] zod validation implemented 

# APIs

## to run server
```
npm run start:dev
```
## for typescript change
```
tsc -w
```

## Create Course
```
METHOD POST api:  http://localhost:5000/api/course
```

## Gel filter and sort course
```
METHOD GET api:  http://localhost:5000/api/courses
```
## create category
```
METHOD POST api:  http://localhost:5000/api/categories
```
## get all categories
```
METHOD GET api:  http://localhost:5000/api/categories
```
## Create a Review
```
METHOD POST api:  http://localhost:5000/api/reviews
```
## update course
```
METHOD PUT api:  http://localhost:5000/api/courses/:courseId
```

## Get course by id with reviews
```
METHOD GET api:  http://localhost:5000/api/courses/:courseId/reviews
```
## Get the best course based on averagte review
```
METHOD GET api:  http://localhost:5000/api/course/best
```

**Note:** it's so challanging to (get the course based on avarage) implement this and update the course primitive and non primitive data(without mutation).  