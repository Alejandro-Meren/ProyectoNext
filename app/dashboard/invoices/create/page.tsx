import CreateForm from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUser } from '@/auth';

export default async function Page() {
  const customers = (await fetchCustomers()).map((customer: any) => ({
    ...customer,
    profile_image: customer.profile_image || 'default_image_url',
  }));

  const session = await auth();

  if (!session || !session.user?.email) {
    redirect('/login');
    return null;
  }

  const userEmail = session.user.email;
  const user = await getUser(userEmail);

  if (!user) {
    redirect('/login');
    return null;
  }

  const currentUser = {
    ...user,
    profile_image: user.profile_image || 'default_image_url',
  };

  return (
    <main className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Appointment',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <CreateForm customers={customers} currentUser={currentUser} userRole={user.role} />
    </main>
  );
}