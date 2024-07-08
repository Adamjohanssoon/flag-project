import './App.css'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/homepage/HomePage'
import CountryPage from './pages/countrypage/CountryPage'
import ThemeProvider from './components/Theme'

const routesFromElements = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/Country/:countryName" element={<CountryPage />} />
    </Route>
)

const router = createBrowserRouter(routesFromElements)

function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
