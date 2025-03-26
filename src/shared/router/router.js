import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/home/Home.vue'
import BlogPage from '@/views/blogs/Blogs.vue'
import ContactPage from '@/views/contact/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/services/Services.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/products/Products.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: BlogPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  },
//   {
//     path: '/about',
//     name: 'About',
//     component: () => import('@/views/About.vue')
//   },
//   {
//     path: '/service',
//     name: 'Service',
//     component: () => import('@/views/Service.vue')
//   },
//   {
//     path: '/gallery',
//     name: 'Gallery',
//     component: () => import('@/views/Gallery.vue')
//   },
//   {
//     path: '/blog',
//     name: 'Blog',
//     component: () => import('@/views/Blog.vue')
//   },
//   {
//     path: '/contact',
//     name: 'Contact',
//     component: () => import('@/views/Contact.vue')
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
