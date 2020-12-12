import { Router } from 'express'
import userRoutes from './modules/users/routes'
import brandRoutes from './modules/brands/routes'
import categoryRoutes from './modules/categories/routes'
import productRoutes from './modules/products/routes'
import authRoute from './modules/auth/routes'
import roleRoute from './modules/roles/routes'

const routes = Router()
routes.use('/users', userRoutes);
routes.use('/brands', brandRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/products', productRoutes);
routes.use('/roles', roleRoute)
routes.use('/', authRoute);
export default routes