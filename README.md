# DRY
dont repeat your self

## selects
```js
import { create } from "zustand";
import axios from "axios";

const useSelectsStore = create((set) => ({
    data: {
        roles: [],
        services: [],
        clients: [],
        clientPhones: [],
        clientEmails: [],
    },

    getSelects: async (clientId) => {
        try {
            const response = await axios.get(`admin/selects?allSelects=roles,services,clients${clientId ? `,clientPhones=${clientId},clientEmails=${clientId}` : ''}`);

            const rolesData = response.data.find((item) => item.label === "roles")?.options || [];
            const servicesData = response.data.find((item) => item.label === "services")?.options || [];
            const clientsData = response.data.find((item) => item.label === "clients")?.options || [];
            const clientPhonesData = response.data.find((item) => item.label === "clientPhones")?.options || [];
            const clientEmailsData = response.data.find((item) => item.label === "clientEmails")?.options || [];

            set({
                data: {
                    roles: rolesData,
                    services: servicesData,
                    clients: clientsData,
                    clientPhones: clientPhonesData,
                    clientEmails: clientEmailsData
                },
            });
        } catch (error) {
            console.error("Error fetching selects:", error);
        }
    },
}));

export default useSelectsStore;

