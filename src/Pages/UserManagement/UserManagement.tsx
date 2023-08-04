import { getRoles } from '@/services/apis/rbac';
import { RolesResponse } from '@/Types/rbac';
import { useQuery } from '@tanstack/react-query';
import Roles from './Components/Roles';
import Users from './Components/Users';

const UserManagement: React.FC = () => {
  const { data: roleData, isLoading: rolesLoading } = useQuery<
    RolesResponse,
    Error
  >({
    queryKey: ['role'],
    queryFn: getRoles,
  });

  return (
    <main className="inset-0 w-full h-screen z-0 flex bg-[#F2F2F2]">
      <div className="h-screem overflow-auto w-full">
        <div className="my-0 mx-auto w-full max-w-3xl py-[60px]">
          <div className="font-medium text-xl text-black w-full border-b border-dashed border-black/[0.06] pb-5">
            Manage Permissions
          </div>
          <Roles roleData={roleData} roleLoading={rolesLoading} />
          <Users />
        </div>
      </div>
    </main>
  );
};

export default UserManagement;
