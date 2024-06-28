import { Outlet } from 'react-router-dom';

import Header from './components/Header';

function App() {
    return (
        <div className="min-h-screen bg-[#ededed] flex flex-col">
            <Header />
            <div className="px-8 py-5 flex flex-1">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
