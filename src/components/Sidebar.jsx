import Logo from "./Logo";
import { Group, Theater } from "lucide-react";
const Sidebar = () => {
    return (
    <aside className="fixed top-0 left-[-500px] lg:left-0 h-full min-h-screen w-full max-w-[400px] 
    lg:w-[250px] bg-base p-4 border-bordercolor lg:border-r-2 flex-col items-stretch justify-between 
    transition-all duration-500">
        {/* Sidebar content goes here */}
        <div className="flex items-center justify-between">
            <Logo />
        </div>
        {/* Sidebar top end */}
        {/* Sidebar middle start */}
        <div className="flex-1 mt-8 bordercolor border-b overflow-hidden overflow-y-auto">
            <a href="#" className="flex items-center gap-2 my-3 py-2 px-4 transition-all 
            text-tcolor rounded-md bg-secondary">
              <Group/>
              <h3 className="text-lg">Cyber Dashboard</h3>
            </a>
             <a href="#" className="flex items-center gap-2 my-3 py-2 px-4 transition-all 
            text-tcolor rounded-md bg-secondary">
              <Theater/>
              <h3 className="text-lg">Threat Type</h3>
            </a>
            
        </div>
        {/* Sidebar middle end */}
      
    </aside>
    );
};

export default Sidebar;