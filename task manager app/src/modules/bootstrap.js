import brandRouter from "./brand/brand.router.js"
import categoryRouter from "./category/category.router.js"
import productRouter from "./product/product.router.js"
import SubcategoryRouter from "./subCategory/subCategory.router.js"
import { userRouter } from "./user/user.router.js"


export const bootstrap = (app) => {
    app.use('/api/categories', categoryRouter)
    app.use('/api/subcategories', SubcategoryRouter)
    app.use('/api/products', userRouter)
}