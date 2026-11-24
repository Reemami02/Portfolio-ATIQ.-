# ATIQ Clothing Store

This project has two parts:

- `src`: Angular website.
- `backend`: Node.js, Express, and MongoDB.

The code is kept in simple components, services, and models. The website design and pages are unchanged.

## Run the Backend

Open a terminal inside the `backend` folder:

```bash
npm install
npm start
```

The backend runs at `http://localhost:3000`.

It connects to this MongoDB database:

```text
mongodb://localhost:27017/final_project
```

Make sure MongoDB is running.

## Run Angular

Open another terminal in the main project folder:

```bash
npm install
npm start
```

The website runs at `http://localhost:4200`.

## Important Pages

- Login and Register: `http://localhost:4200/auth`
- Home: `http://localhost:4200/home`
- Dashboard: `http://localhost:4200/dashboard`
- Profile: `http://localhost:4200/profile`
- Cart: `http://localhost:4200/cart`

All page routes are open without route guards.

## Main Features

- View men's and women's products.
- View product details.
- Add products to the cart.
- Place orders.
- Edit the About page.
- Edit Contact information.
- View messages and users.
- Add, edit, and delete products.

## If Products Do Not Appear

1. Make sure MongoDB is running.
2. Start the backend.
3. Open `http://localhost:3000` and check that the API is running.
4. Check that the `menclothings` and `womenclothings` collections contain products.

The project is for local learning and testing. Do not publish it online before adding proper password protection and server-side permissions.
