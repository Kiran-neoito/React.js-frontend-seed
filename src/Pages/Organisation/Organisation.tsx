import OrganisationList from './Components/OrganisationList';
import UserList from './Components/UserList';
import { useParams } from 'react-router-dom';

const Organisation: React.FC = () => {
  const params = useParams();
  return (
    <main className="inset-0 w-full h-screen z-0 flex bg-[#F2F2F2]">
      <div className="h-screem overflow-auto w-full">
        <div className="my-0 mx-auto w-full max-w-3xl py-[60px]">
          <div className="font-medium text-xl text-black w-full border-b border-dashed border-black/[0.06] pb-5">
            Organization{params.id ? '' : 's'}
          </div>
          {!params.id ? (
            <div className="relative mt-[27px] px-2.5 h-14 rounded-lg flex items-center gap-3 bg-white">
              <input
                className="text-base font-medium border-none focus:outline-none flex-1"
                placeholder="Search for organizations"
                type="text"
              />
              <button className="bg-primary-gray h-8 flex justify-center items-center px-5 text-white rounded-md">
                Search
              </button>
            </div>
          ) : null}
          {params.id ? <UserList /> : <OrganisationList />}
        </div>
      </div>
    </main>
  );
};

export default Organisation;
