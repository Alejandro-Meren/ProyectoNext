import CreateForm from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = (await fetchCustomers()).map((customer: any) => ({
    ...customer,
    profile_image: customer.profile_image || 'default_image_url', // Provide a default image URL if missing
  }));

  return (
    <main>
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
      <CreateForm customers={customers} />
      
    </main>
  );
}