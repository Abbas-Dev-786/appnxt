import Home from '../../component/feature/Home/Home'
import CreateProject from '../../component/feature/Projects/Create/CreateProject'
import Projects from '../../component/feature/Projects/View/Projects'
import Slider from '../../component/feature/Slider/Slider'
import Logout from '../../component/shared/Auth/Logout'
import WorkProcess from '../../component/feature/WorkProcess/WorkProcess'
import Services from '../../component/feature/Services/View/Services'
import CreateService from '../../component/feature/Services/Create/CreateService'

const rootRoutes = [
    {
        path: '',
        element: <Home />
    },
    {
        path: 'project',
        element: <Projects />
    },
    {
        path: 'create-project',
        element: <CreateProject />
    },
    {
        path: 'update-project/:id',
        element: <CreateProject />
    },
    {
        path: 'procedure',
        element: <WorkProcess />
    },
    {
        path: 'slider',
        element: <Slider />
    },
    {
        path: 'services',
        element: <Services />
    },
    {
        path: 'create-service',
        element: <CreateService />
    },
    {
        path: 'update-service/:id',
        element: <CreateService />
    },
    {
        path: 'logout', 
        element: <Logout />
    }
]

export default rootRoutes