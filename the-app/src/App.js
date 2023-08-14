import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './htmlpages/home';

import NavU from './userpages/components/NavU';
import Nav from './doctorpages/components/Nav';
import Footer from './components/Footer';

import Indexd from './doctorpages/doctors/indexd';
import Create from './doctorpages/doctors/create';
import EditDoctor from './doctorpages/doctors/edit';

import Register from './userlogcreate/Register';
import Login from './userlogcreate/Login';

import UserComponent from './userpages/UserComponent';
import CreateAppointment from './userpages/CreateAppointment';
import ShowAppointments from './doctorpages/showappointments';
import ShowApprovedAppointments from './doctorpages/showApprovedAppointments';

import Staffpage from './userpages/Staff/staffpage';
import BestDoctors from './userpages/Staff/BestDoctors';
import BestNurses from './userpages/Staff/BestNurses';

import ShowUserAppointments from './userpages/Appointments/showappointments';
import ShowUserTestRequests from './userpages/Appointments/showTestRequests';

import Healthpage from './userpages/Health-store/Healthpage';
import Vitamins from './userpages/Health-store/Vitamins';
import PainR from './userpages/Health-store/Painrelief';
import ColdF from './userpages/Health-store/coldandflu';
import SkinC from './userpages/Health-store/skincare';
import OralC from './userpages/Health-store/oralcare';

import ViweP from './userpages/viewProduct/viewP';
import ViweP1 from './userpages/viewProduct/viewP1';
import ViweP2 from './userpages/viewProduct/viewP2';
import ViweP3 from './userpages/viewProduct/viewP3';
import ViweP4 from './userpages/viewProduct/viewP4';

import Cart from './userpages/Cartview/cartview';
import Checkout from './userpages/checkout/checkoutpage';
import Order from './userpages/orders/orderview';

import Indexs from './doctorpages/speciality/indexs';
import CreateS from './doctorpages/speciality/create';
import Editspeciality from './doctorpages/speciality/edit';


import Indexn from './doctorpages/nursepages/indexn';
import CreateN from './doctorpages/nursepages/create';
import EditNurse from './doctorpages/nursepages/edit';

import Indexc from './doctorpages/category/indexc';
import CreateC from './doctorpages/category/create';
import Editcategory from './doctorpages/category/edit';

import Indexp from './doctorpages/product/indexp';
import CreateP from './doctorpages/product/create';
import Editvitamins from './doctorpages/product/edit';

import Indexp1 from './doctorpages/product1/indexp1';
import CreateP1 from './doctorpages/product1/create';
import EditPainRelief from './doctorpages/product1/edit';

import Indexp2 from './doctorpages/product2/indexp2';
import CreateP2 from './doctorpages/product2/create';
import EditColdflu from './doctorpages/product2/edit';

import Indexp3 from './doctorpages/product3/indexp3';
import CreateP3 from './doctorpages/product3/create';
import EditSkincare from './doctorpages/product3/edit';

import Indexp4 from './doctorpages/product4/indexp4';
import CreateP4 from './doctorpages/product4/create';
import EditOralcare from './doctorpages/product4/edit';

import Indexpr from './doctorpages/promotion/indexpr';
import CreatePR from './doctorpages/promotion/create';
import EditPromotion from './doctorpages/promotion/edit';

import Indexnu from './doctorpages/news/indexnu';
import CreateNU from './doctorpages/news/create';

import EditNews from './doctorpages/news/edit';

import Order2 from './doctorpages/orders/orderadminview';
import Userdashboard from './userpages/UserDashboard';

import Seenews from './userpages/News/seenews';
import DoctorHomePage from './doctorpages/doctorhomepage';

import ShowLabPatients from './doctorpages/showLabPatients';
import SendToRoom from './doctorpages/sendToRoom';
import WriteDiagnose from './doctorpages/writeDiagnose';
import DetermineTest from './doctorpages/determineTest';
import Indextech from './doctorpages/labtechnician/indextech';
import CreateTechnician from './doctorpages/labtechnician/create';
import EditTechnician from './doctorpages/labtechnician/edit';
import EditDepartment from './doctorpages/department/edit';

import CreateDep from './doctorpages/department/create';
import Indexdep from './doctorpages/department/indexdep';
import EditLabTest from './doctorpages/laboratorytests/edit';

import CreateLabTest from './doctorpages/laboratorytests/create';
import Indexlab from './doctorpages/laboratorytests/indexlab';
import IndexTest from './doctorpages/testrequests/indextest';

import EditRoom from './doctorpages/roompages/edit';
import CreateRoom from './doctorpages/roompages/create';
import Indexr from './doctorpages/roompages/indexr';


import { ProductsProvider } from './userpages/Health-store/context';


function App() {
  return (
    <div >
      <BrowserRouter>
        <NavU />
        <Routes>

          <Route path="/" element={<Header />} />

          <Route path="/userpages/UserDashboard" element={<Userdashboard />} />

          <Route path="/userpages/UserComponent" element={<UserComponent />} />

          <Route path="/userpages/Health-store/Healthpage" element={<Healthpage />} />



          <Route path="/userpages/Health-store/Painrelief" element={<PainR />} />
          <Route path="/userpages/Health-store/coldandflu" element={<ColdF />} />
          <Route path="/userpages/Health-store/skincare" element={<SkinC />} />
          <Route path="/userpages/Health-store/oralcare" element={<OralC />} />



          <Route path="/viewProduct/viewP/:id" element={<ViweP />} />
          <Route path="/viewProduct/viewP1/:id" element={<ViweP1 />} />
          <Route path="/viewProduct/viewP2/:id" element={<ViweP2 />} />
          <Route path="/viewProduct/viewP3/:id" element={<ViweP3 />} />
          <Route path="/viewProduct/viewP4/:id" element={<ViweP4 />} />

          <Route path="/userpages/Cartview/cartview" element={<Cart />} />
          <Route path="/userpages/checkout/checkoutpage" element={<Checkout />} />
          <Route path="/userpages/orders/orderview" element={<Order />} />

          <Route path="/userlogcreate/Register" element={<Register />} />
          <Route path="/userlogcreate/Login" element={<Login />} />

          <Route path="/userpages/Appointments/showappointments" element={<ShowUserAppointments />} />
          <Route path="/userpages/Appointments/showTestRequests" element={<ShowUserTestRequests />} />

          <Route path="/userpages/UserComponent" element={<UserComponent />} />
          <Route path="/userpages/CreateAppointment" element={<CreateAppointment />} />

          <Route path="userpages/Staff/staffpage" element={<Staffpage />} />
          <Route path="/userpages/Staff/BestDoctors" element={<BestDoctors />} />
          <Route path="/userpages/Staff/BestNurses" element={<BestNurses />} />

          <Route path="/userpages/news/seenews" element={<Seenews />} />

        </Routes>

        <div>
          <Nav />
          <Routes>

            <Route path="/doctorpages/doctorhomepage" element={<DoctorHomePage />} />

            <Route path="/doctorpages/doctors/Indexd" element={<Indexd />} />
            <Route path="/doctorpages/doctors/Create" element={<Create />} />
            <Route path="/doctorpages/doctors/Edit/:id" element={<EditDoctor />} />

            <Route path="/doctorpages/ShowAppointments" element={<ShowAppointments />} />
            <Route path="/doctorpages/showApprovedAppointments" element={<ShowApprovedAppointments />} />

            <Route path="/speciality/indexs" element={<Indexs />} />
            <Route path="/speciality/Create" element={<CreateS />} />
            <Route path="/speciality/Edit/:id" element={<Editspeciality />} />


            <Route path="/nursepages/Indexn" element={<Indexn />} />
            <Route path="/nursepages/Create" element={<CreateN />} />
            <Route path="/nursepages/Edit/:id" element={<EditNurse />} />

            <Route path="/category/Indexc" element={<Indexc />} />
            <Route path="/category/Create" element={<CreateC />} />
            <Route path="/category/Edit/:id" element={<Editcategory />} />

            <Route path="/product/Indexp" element={<Indexp />} />
            <Route path="/product/Create" element={<CreateP />} />
            <Route path="/product/Edit/:id" element={<Editvitamins />} />

            <Route path="/product1/Indexp1" element={<Indexp1 />} />
            <Route path="/product1/Create" element={<CreateP1 />} />
            <Route path="/product1/Edit/:id" element={<EditPainRelief />} />

            <Route path="/product2/indexp2" element={<Indexp2 />} />
            <Route path="/product2/Create" element={<CreateP2 />} />
            <Route path="/product2/Edit/:id" element={<EditColdflu />} />

            <Route path="/product3/indexp3" element={<Indexp3 />} />
            <Route path="/product3/Create" element={<CreateP3 />} />
            <Route path="/product3/Edit/:id" element={<EditSkincare />} />

            <Route path="/product4/indexp4" element={<Indexp4 />} />
            <Route path="/product4/Create" element={<CreateP4 />} />
            <Route path="/product4/Edit/:id" element={<EditOralcare />} />

            <Route path="/promotion/indexpr" element={<Indexpr />} />
            <Route path="/promotion/Create" element={<CreatePR />} />
            <Route path="/promotion/Edit/:id" element={<EditPromotion />} />

            <Route path="/doctorpages/news/indexnu" element={<Indexnu />} />
            <Route path="/news/Create" element={<CreateNU />} />
            <Route path="/news/Edit/:id" element={<EditNews />} />

            <Route path="/orders/orderadminview" element={<Order2 />} />

            <Route path="/doctorpages/showLabPatients" element={<ShowLabPatients />} />
            <Route path="/doctorpages/sendToRoom/:id" element={<SendToRoom />} />
            <Route path="/doctorpages/writeDiagnose/:id" element={<WriteDiagnose />} />
            <Route path="/doctorpages/determineTest/:id" element={<DetermineTest />} />

            <Route path="/doctorpages/department/indexdep" element={<Indexdep />} />
            <Route path="/doctorpages/department/create" element={<CreateDep />} />
            <Route path="/doctorpages/department/edit/:id" element={<EditDepartment />} />

            <Route path="/doctorpages/laboratorytests/indexlab" element={<Indexlab />} />
            <Route path="/doctorpages/laboratorytests/create" element={<CreateLabTest />} />
            <Route path="/doctorpages/laboratorytests/edit/:id" element={<EditLabTest />} />

            <Route path="/doctorpages/testrequests/indextest" element={<IndexTest />} />

            <Route path="/doctorpages/roompages/indexr" element={<Indexr />} />
            <Route path="/doctorpages/roompages/create" element={<CreateRoom />} />
            <Route path="/doctorpages/roompages/edit/:id" element={<EditRoom />} />

            <Route path="/doctorpages/labtechnician/Indextech" element={<Indextech />} />
            <Route path="/doctorpages/labtechnician/Create" element={<CreateTechnician />} />
            <Route path="/doctorpages/labtechnician/Edit/:id" element={<EditTechnician />} />
          </Routes>
        </div>

        <ProductsProvider>
          <Routes>
            <Route path="/userpages/Health-store/Vitamins" element={<Vitamins />} />
          </Routes>
        </ProductsProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;