import { useParams } from 'react-router-dom';
import { Site } from '../types/Site';
import { getSite } from '../api/site';
import { getRegisters } from '../api/register';
import { Register } from '../types/Register';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function SitePage() {
    const [registers, setRegisters] = useState<Register[]>([]);

    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>Invalid site id</div>;
    }

    const [site, setSite] = useState<Site | null>(null);

    useEffect(() => {
        getSite(id).then((res) => {
            setSite(res);
        });
    }, [id]);

    useEffect(() => {
        getRegisters(id).then((res) => {
            setRegisters(res);
        });
    }, [id]);

    return (
        <div className='m-3'>
            <div className='flex justify-center mt-3'>
                <h1 className='text-2xl font-bold'>{site?.name}</h1>
            </div>
            {registers.map((register) => (
                <>
                    <div className="stats shadow">
                        <div className='stat'>
                            <div key={register._id} className='stat-title'>{register.name}</div>
                            <div key={register._id} className='stat-value'>100</div>
                            <div key={register._id} className='stat-desc'>{register.controlType}</div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}