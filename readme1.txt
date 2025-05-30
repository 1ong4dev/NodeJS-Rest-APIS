
/routes
        -auth.route.js
            Register(post)
            Login(post)
            profile(get) --->   token will be needed
            logout(get)  ----> token will be needed
        -post.route.js
            Add post (post)  --->   token will be needed
            list post (get)  ----> token will be needed
            update post (put)  ----> token will be needed
            delete post (del)  ----> token will be needed

/controllers
    -auth.controller.js
    -post.controller.js

/models
    -user.model.js [name, email, password, gender]
    -post.model.js [title, content, status, userId]