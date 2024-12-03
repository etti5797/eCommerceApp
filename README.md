# Full Stack eCommerce Website (MERN Stack)

This project is a full-stack eCommerce website built using the MERN stack: **MongoDB**, **Express.js**, **React.js**, and **Node.js**. It combines a feature-rich front-end, a powerful back-end, and an admin panel to create a complete online shopping experience. The website is fully responsive, ensuring it looks great and functions seamlessly across different screen sizes.

## Features  

### Front-End  
- Display products with detailed views.  
- Shopping cart functionality.  
- User authentication with login and registration pages.  
- **Responsive Design**: Optimized for various screen sizes, from mobile to desktop.  

### Back-End  
- APIs for managing products (add, display, remove).  
- APIs for managing cart items.  
- User authentication using JWT for login and registration.  

### Admin Panel  
- Add new products to the store.  
- View store products.  
- Delete a product from the store.  

---

## Tools and Technologies Used  

### Back-End  
- **Node.js** and **Express.js**: Server framework and route handling.  
- **Mongoose**: For MongoDB object modeling.  
- **JWT (jsonwebtoken)**: For secure authentication.  
- **Multer**: For file uploads (e.g., product images).  
- **Path**: For working with file and directory paths.  
- **CORS**: To manage cross-origin resource sharing.  
- **dotenv**: For managing environment variables.  

### Front-End  
- **React.js**: For building the user interface.  
  - **React Router (BrowserRouter)**: For navigation and routing.  
  - **React Hooks**: `useState`, `useEffect`, and `useContext` for state management, side effects, and context sharing.  
- **Responsive Design**: Media queries and flexible layouts for optimal display on different devices.  

---

## Credit  

This project was developed following a tutorial by GreatStack ([YouTube Tutorial](https://www.youtube.com/watch?v=y99YgaQjgx4)).  
Special thanks to the author for their detailed guidance and insights.


## Updates and Additions  

- **Newsletter Subscription**: Added a collection in the database to store email subscriptions, including email validation and prevention of duplicate entries.  
- **Latest Collection Button**: Made functional, now scrolling smoothly to the corresponding section on the page.  
- **Wishlist Page**: Introduced a new page where users can view their wishlist. Product images in the **Cart** and **Wishlist** now link to the respective product pages.  
- **Heart Icon on Product Page**: Added an interactive heart icon overlay on the product image, allowing users to toggle between adding/removing items from their wishlist. The icon updates dynamically to reflect the current state.  
- **Wishlist Management**: Enabled users to remove items directly from the wishlist.  

---

