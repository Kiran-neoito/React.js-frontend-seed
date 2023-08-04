import { ThreeDot } from '@/assets/images';
import useOnClickOutside from '@/hooks/useClickOutside';
import { CreateRole } from '@/services/types/rbac';
import { CreateRoleApi, deleteRole, UpdateRoleApi } from '@/services/apis/rbac';
import { Permissions, RolesResponse } from '@/Types/rbac';
import React, { useRef, useState } from 'react';
import CreateRolePop from './CreateRolePop';
import UserList from './UserList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import DeleteError from './DeleteError';
import DeleteRole from './DeleteRole';
import { getInitial } from '@/helpers/utils';

interface Props {
  roleLoading: boolean;
  roleData: RolesResponse | undefined;
}

const Roles: React.FC<Props> = ({ roleData }) => {
  const [createRole, setCreateRoleOpen] = useState(false);
  const queryClient = useQueryClient();
  //   const [editRole, setEditRoleOpen] = useState<string>('');
  const [editRole, setEditRoleOpen] = useState<string>('');
  const [userListOpen, setUserListOpen] = useState<string>('');
  const [openMoreFirst, setOpenMoreFirst] = useState<string>('');
  const [deleteRolePop, setDeleteRolePop] = useState<string>('');
  const morePopRef = useRef<HTMLDivElement>(null);
  const createRolePop = () => {
    setCreateRoleOpen(true);
  };
  const [apiError, setApiError] = useState<string>('');

  useOnClickOutside(morePopRef, () => setOpenMoreFirst(''));

  const onCreateUser = (values: CreateRole) => {
    if (editRole) {
      const updateValue = {
        role_uuid: editRole,
        permissions: values.permissions,
      };
      updateRole(updateValue);
    } else {
      createRoleFn(values);
    }
  };
  // //   const {data, totalCount} = roleData.data.data
  // //   console.log(data,totalCount);
  //   console.log(roleData.data.data);

  const { mutate: createRoleFn, isLoading: isCreateLoading } = useMutation({
    mutationFn: CreateRoleApi,
    onSuccess: () => {
      setCreateRoleOpen(false);
      toast.success('Role created Successfully!', {
        autoClose: 5000,
      });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.data?.message) {
        if (err.response.status != 401) {
          toast.error(err.response.data.message, {
            autoClose: 5000,
          });
        }
        setApiError(err.response.data.message);
      }
    },
  });

  const { mutate: updateRole, isLoading: isUpdateLoading } = useMutation({
    mutationFn: UpdateRoleApi,
    onSuccess: () => {
      setEditRoleOpen('');
      toast.success('Role updated Successfully!', {
        autoClose: 5000,
      });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.data?.message) {
        if (err.response.status != 401) {
          toast.error(err.response.data.message, {
            autoClose: 5000,
          });
        }
        setApiError(err.response.data.message);
      }
    },
  });

  const { mutate: roledeleteHandler, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      setDeleteRolePop('');
      queryClient.invalidateQueries(['role']);
    },
  });

  const generatePermission = (permissions: Permissions[] | undefined) => {
    if (permissions) {
      const displayArray = permissions?.map((permission) => {
        let newText = {
          id: permission.id,
          text: getInitial(permission.name).join(''),
        };
        if (permission.access) {
          const acceses: string = permission.access.reduce(
            (accesText, access, index, arr) => {
              return `${accesText}${access.name}${
                index === arr.length - 1 ? ')' : ', '
              }`;
            },
            `${newText.text}(`
          );

          newText = { ...newText, text: acceses };
        }
        return newText;
      });
      return displayArray;
    }
    return [{ id: '-', text: '-' }];
  };
  const userListPop = (roleUuId: string) => {
    setUserListOpen(roleUuId);
  };

  return (
    <div className="mt-9 pb-10 border-b border-dashed border-black/[0.06]">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h4 className="text-black font-medium text-sm leading-17">
          Manage Roles & Permissions
        </h4>
        <button
          onClick={createRolePop}
          className="bg-main-blue text-sm rounded-md text-white px-3 py-2 h-11 font-medium flex gap-2 items-center"
        >
          <img src="/src/assets/images/icon/Add.svg" alt="add" />
          <span>New Role</span>
        </button>
        {createRole ? (
          <CreateRolePop
            onClose={() => setCreateRoleOpen(false)}
            onSubmitInvite={(values) => onCreateUser(values)}
            apiError={apiError}
            isLoading={isCreateLoading}
          />
        ) : null}
        {editRole ? (
          <CreateRolePop
            onClose={() => setEditRoleOpen('')}
            onSubmitInvite={(values) => onCreateUser(values)}
            editRoleId={editRole}
            apiError={apiError}
            isLoading={isUpdateLoading}
          />
        ) : null}
      </div>
      <table className="table-auto w-full bg-white mt-4 shadow-md">
        <thead>
          <tr className="h-12">
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              Role Name
            </th>
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              No Of Users
            </th>
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              Permission
            </th>
            <th className="px-3 border-b border-gray-variant-8 text-left text-black font-medium text-sm leading-17">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {roleData && roleData.data.data.data.length ? (
            <>
              {roleData.data.data.data?.map((role) => (
                <React.Fragment key={role.role_uuid}>
                  {userListOpen === role.role_uuid ? (
                    <UserList
                      onClose={() => setUserListOpen('')}
                      roleName={role.role_name}
                      roleId={role.role_uuid}
                      isUsers={role.totalUsers !== 0}
                    />
                  ) : null}
                  <tr className="h-[68px]">
                    <td
                      onClick={() => userListPop(role.role_uuid)}
                      className="px-3 text-left text-black font-medium text-sm leading-17 cursor-pointer"
                    >
                      <p className="truncate max-w-[104px]">{role.role_name}</p>
                    </td>
                    <td
                      onClick={() => userListPop(role.role_uuid)}
                      className="px-3 text-left text-black font-medium text-sm leading-17 cursor-pointer"
                    >
                      {role.totalUsers}
                    </td>
                    <td className="px-3 text-left text-black font-medium text-sm leading-17">
                      {generatePermission(role.permissions).map((perm) => (
                        <p key={perm.id}>{perm.text}</p>
                      ))}
                    </td>
                    <td className="px-3 text-left text-black font-medium text-sm leading-17">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMoreFirst(role.role_uuid)}
                          className={`w-9 h-9 hover:bg-gray-variant-7 rounded flex justify-center items-center ${
                            openMoreFirst === role.role_uuid
                              ? 'bg-gray-variant-7'
                              : 'bg-white'
                          }`}
                        >
                          <img src={ThreeDot} alt="more" />
                        </button>
                        {openMoreFirst === role.role_uuid ? (
                          <div
                            className="absolute top-full left-0 bg-white rounded-5 px-5 py-4 border shadow-sm z-10 flex flex-col items-start"
                            ref={morePopRef}
                          >
                            <button
                              className="font-normal text-xs mb-3"
                              onClick={() => setEditRoleOpen(role.role_uuid)}
                            >
                              Edit
                            </button>
                            <button
                              className="font-normal text-xs"
                              onClick={() => {
                                role.totalUsers === 0
                                  ? setDeleteRolePop(role.role_uuid)
                                  : setDeleteRolePop('error');
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </>
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-10 px-3 text-gray-400 font-medium text-sm leading-17"
              >
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {deleteRolePop === 'error' ? (
        <DeleteError onClose={() => setDeleteRolePop('')} />
      ) : null}
      {!!deleteRolePop.length && deleteRolePop !== 'error' ? (
        <DeleteRole
          onClose={() => setDeleteRolePop('')}
          onDelete={roledeleteHandler}
          deleteLoading={deleteLoading}
          id={deleteRolePop}
        />
      ) : null}
    </div>
  );
};

export default Roles;
