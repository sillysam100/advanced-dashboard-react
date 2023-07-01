import Sites from '../components/Sites';
import { getSites } from '../api/site';
import { Site } from '../types/Site';
import { SetStateAction, useEffect, useState } from 'react';

const DashboardPage = () => {
    const [sites, setSites] = useState<Site[]>([]);

    useEffect(() => {
        getSites().then((res: SetStateAction<Site[]>) => {
            setSites(res);
        });
    }, []);

    return (
        <div>
            <Sites sites={sites} />
        </div>
    );
};

export default DashboardPage;
