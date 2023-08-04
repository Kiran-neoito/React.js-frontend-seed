// import { USER_ROLES } from '@/common/utility/user-roles';
import { Down } from '@/assets/images';
import InputBox from '@/components/FormFields/InputBox/InputBox';
import { getPermissions, getRole } from '@/services/apis/rbac';
import {
  AccessType,
  CreateRole,
  Permission,
  PermissionGet,
  Permissions,
} from '@/services/types/rbac';
import { CreateRoleFormSchema } from '@/services/validation';
import { useQuery } from '@tanstack/react-query';
import { Formik, FormikProps } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';

type Props = {
  onClose: () => void;
  onSubmitInvite: (data: CreateRole) => void;
  apiError: string;
  isLoading: boolean;
  editRoleId?: string;
};

const CreateRolePop: React.FC<Props> = ({
  onClose,
  onSubmitInvite,
  apiError,
  isLoading,
  editRoleId,
}) => {
  const formikRef = useRef<FormikProps<CreateRole>>(null);
  const [currentPermission, setCurrentPermission] = useState<
    number | undefined
  >();

  const initialValues = {
    name: '',
    permissions: [],
  };

  const onSubmit = (values: CreateRole) => {
    onSubmitInvite(values);
  };

  const contentStyle = {
    maxWidth: '440px',
    width: '100%',
  };

  const { data: permissionsQuery } = useQuery({
    keepPreviousData: false,
    queryKey: ['role', 'permissions'],
    queryFn: () => getPermissions(),
  });

  const isOpened = (permission: Permissions) => {
    return permission.id !== 3 && permission.id === currentPermission;
  };

  const { data: role } = useQuery({
    enabled: !!editRoleId?.length,
    keepPreviousData: false,
    queryKey: ['role', editRoleId],
    queryFn: () => getRole(editRoleId ?? ''),
  });

  useEffect(() => {
    formikRef.current?.setFieldValue('name', role?.data.data.role_name);
    const permissionArray: PermissionGet[] = role?.data.data.permissions;
    formikRef.current?.setFieldValue(
      'permissions',
      permissionArray?.map(
        (perm) =>
          ({
            permission_id: perm.id,
            accessTypes: perm?.access?.map((access) => access.id) || [],
          } || [])
      )
    );
  }, [role]);

  const checkMain = (
    permission: Permissions,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const permissionArray = formikRef.current?.values?.permissions;
    const index: number =
      permissionArray?.findIndex(
        (item) => item.permission_id === permission.id
      ) || 0;
    if (e.target.checked) {
      setCurrentPermission(permission.id);
      if (
        !permissionArray?.length ||
        !permissionArray?.some((item) => item.permission_id === permission.id)
      ) {
        permissionArray?.push({
          permission_id: permission?.id,
          accessTypes: permission?.user_permissions_accessType?.map(
            (a) => a.accessType.id
          ),
        });
      } else {
        if (permissionArray) {
          permissionArray[index].accessTypes =
            permission?.user_permissions_accessType?.map(
              (a) => a.accessType.id
            );
        }
      }
      formikRef.current?.setFieldValue('permissions', permissionArray);
    } else {
      formikRef.current?.setFieldValue(
        'permissions',
        permissionArray?.filter((item) => item.permission_id !== permission.id)
      );
    }
    formikRef.current?.setFieldTouched('permissions', true);
  };

  const checkSub = (
    permission: Permissions,
    types: AccessType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const permissionArray = formikRef.current?.values?.permissions;
    const index: number =
      permissionArray?.findIndex(
        (item) => item.permission_id === permission.id
      ) || 0;
    if (e.target.checked) {
      if (
        permissionArray?.some((item) => item.permission_id === permission.id)
      ) {
        permissionArray[index].accessTypes?.push(types?.accessType?.id);
      } else {
        permissionArray?.push({
          permission_id: permission?.id,
          accessTypes: [types?.accessType?.id],
        });
      }
      formikRef.current?.setFieldValue('permissions', permissionArray);
    } else {
      if (permissionArray) {
        permissionArray[index].accessTypes = permissionArray[
          index
        ].accessTypes?.filter((type) => type !== types?.accessType?.id);
        if (permissionArray[index].accessTypes?.length === 0) {
          formikRef.current?.setFieldValue(
            'permissions',
            permissionArray.filter(
              (item) => item?.permission_id !== permission.id
            )
          );
        } else {
          formikRef.current?.setFieldValue('permissions', permissionArray);
        }
      }
    }
    formikRef.current?.setFieldTouched('permissions', true);
  };
  const isAccessLabelShow = (values: CreateRole, permission: Permissions) => {
    return values.permissions?.find(
      (item: Permission) => item.permission_id === permission.id
    )?.accessTypes?.length;
  };
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={CreateRoleFormSchema}
    >
      {({ handleSubmit, values, errors, touched }) => {
        return (
          <Popup
            open
            modal
            contentStyle={contentStyle}
            closeOnDocumentClick={false}
            closeOnEscape={false}
          >
            <main className="flex-grow h-full w-full bg-white shadow-2xl p-10 rounded-5">
              <div className="font-medium text-lg leading-[22px] text-black mb-7">
                {editRoleId ? role?.data.data.role_name : 'Create New Role'}
              </div>
              <div
                className={`${errors.name && touched.name ? 'mb-1' : 'mb-3'}`}
              >
                {!editRoleId ? (
                  <InputBox
                    type="text"
                    name="name"
                    placeholder="Enter User Name"
                  />
                ) : null}
              </div>
              <div>
                <h5 className=" font-medium text-base leading-5 mb-3">
                  Set Permissions
                </h5>
                {permissionsQuery ? (
                  <>
                    {permissionsQuery?.data?.data?.map(
                      (permission: Permissions) => (
                        <div
                          key={permission?.id}
                          className="border border-tertiary-gray rounded-5 mb-3"
                        >
                          <div
                            className={`flex items-center justify-between p-3 ${
                              isOpened(permission)
                                ? 'border-b border-tertiary-gray'
                                : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                onChange={(e) => checkMain(permission, e)}
                                type="checkbox"
                                checked={
                                  values.permissions?.find(
                                    (item: Permission) =>
                                      item.permission_id === permission.id
                                  )?.accessTypes?.length ===
                                  permission.user_permissions_accessType?.length
                                }
                                className="form-checkbox accent-primary border-gray-variant-8 w-6 h-6 rounded-5 mr-[11px]"
                              />
                              <h5 className="text-primary-gray text-[15px] font-medium leading-18">
                                {permission?.name}
                              </h5>
                            </div>
                            {permission.id !== 3 ? (
                              <div className="flex items-center">
                                {isAccessLabelShow(values, permission) ? (
                                  <div className="bg-badge-blue/[0.12] px-2 py-1 font-normal text-[10px] leading-3 text-badge-blue rounded-[32px] mr-[18px]">
                                    {
                                      values.permissions?.find(
                                        (item: Permission) =>
                                          item.permission_id === permission.id
                                      )?.accessTypes?.length
                                    }{' '}
                                    Access
                                  </div>
                                ) : null}
                                <div
                                  className="p-1 cursor-pointer"
                                  onClick={() =>
                                    setCurrentPermission(
                                      permission.id === currentPermission
                                        ? undefined
                                        : permission.id
                                    )
                                  }
                                >
                                  <img
                                    src={Down}
                                    alt=""
                                    className={`${
                                      permission.id === currentPermission
                                        ? 'rotate-180'
                                        : ''
                                    }`}
                                  />
                                </div>
                              </div>
                            ) : null}
                          </div>
                          {isOpened(permission) ? (
                            <div className="p-3 pb-0">
                              {permission?.user_permissions_accessType?.map(
                                (types) => (
                                  <div
                                    key={types?.accessType?.id}
                                    className="flex items-center mb-3"
                                  >
                                    <input
                                      onChange={(e) =>
                                        checkSub(permission, types, e)
                                      }
                                      type="checkbox"
                                      checked={
                                        !!values.permissions
                                          ?.find(
                                            (item: Permission) =>
                                              item.permission_id ===
                                              permission.id
                                          )
                                          ?.accessTypes?.find(
                                            (type) =>
                                              type === types?.accessType.id
                                          )
                                      }
                                      className="form-checkbox accent-primary border-gray-variant-8 rounded-5 mr-[11px] w-5 h-5"
                                    />
                                    <h5 className="text-primary-gray text-[13px] font-normal leading-4">
                                      {types?.accessType?.name}
                                    </h5>
                                  </div>
                                )
                              )}
                            </div>
                          ) : null}
                        </div>
                      )
                    )}
                  </>
                ) : null}
              </div>
              <div className="relative pt-10">
                {apiError ? (
                  <div className="text-error text-left text-sm first-letter:uppercase bg-white absolute inset-0 h-fit">
                    {apiError}
                  </div>
                ) : null}
                {errors.permissions && touched.permissions ? (
                  <div className="text-error text-left text-sm first-letter:uppercase bg-white absolute inset-0 h-fit">
                    {errors.permissions}
                  </div>
                ) : null}
                <div className="flex">
                  <button
                    type="submit"
                    className="primary-btn h-11 px-3 text-sm leading-17 font-medium rounded-5 border border-primary min-w-[73px]"
                    onClick={() => {
                      handleSubmit();
                    }}
                    disabled={isLoading}
                  >
                    {editRoleId ? 'Save' : 'Create Role'}
                  </button>
                  <button
                    type="button"
                    className="text-sm leading-17 font-medium text-primary-gray hover:opacity-75 text ml-5"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </main>
          </Popup>
        );
      }}
    </Formik>
  );
};

export default CreateRolePop;
