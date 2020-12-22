import { Router } from 'express'
import userRoutes from './modules/users/routes'
import brandRoutes from './modules/brands/routes'
import categoryRoutes from './modules/categories/routes'
import productRoutes from './modules/products/routes'
import authRoute from './modules/auth/routes'
import roleRoute from './modules/roles/routes'
import orderRoute from './modules/orders/routes'
import permissRoute from './modules/orders/routes'

const routes = Router()
routes.use('/users', userRoutes);
routes.use('/brands', brandRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/products', productRoutes);
routes.use('/roles', roleRoute)
routes.use('/', authRoute);
routes.use('/orders', orderRoute);
routes.use('/permissions', permissRoute)
export default routes