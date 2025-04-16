import React, { useEffect, useState } from 'react';
import SpacesService from '../../service/SpacesService';
import SpaceCard from './spaceCard/SpaceCard';
import SpaceDetailModal from './spaceDetail/SpaceDetailModal';
import './SpacesSection.css';

export default function SpacesSection() {
    const [spaces, setSpaces] = useState([]);
    const [filters, setFilters] = useState({ city: [], district: [], type: [] });
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [type, setType] = useState('');
    const [selectedSpace, setSelectedSpace] = useState(null);

    useEffect(() => {
        fetchFilters();
        listSpaces();
    }, []);

    const fetchFilters = () => {
        SpacesService.getFilterSpace()
            .then(response => setFilters(response.data))
            .catch(error => console.error('Error fetching filters:', error));
    };

    const listSpaces = (query = '') => {
        SpacesService.getSpacesForFilter(query)
            .then(response => setSpaces(response.data))
            .catch(error => console.error('Error fetching spaces:', error));
    };

    const filterSpaces = () => {
        const params = [];
        if (city) params.push(`city=${city}`);
        if (district) params.push(`district=${district}`);
        if (type) params.push(`spaceType=${type}`);
        const query = params.length ? `?${params.join('&')}` : '';
        listSpaces(query);
    };

    const resetFilters = () => {
        setCity('');
        setDistrict('');
        setType('');
        listSpaces();
    };

    const openModal = (space) => setSelectedSpace(space);
    const closeModal = () => setSelectedSpace(null);

    return (
        <div className='container-spaces'>
            <h1 className='space-title'>Encuentra Tu Espacio Ideal</h1>
            <div className="content-wrapper">
                <div className="filter-section">
                    <h2>Filtrar Espacios</h2>

                    <label htmlFor="city">Ciudad</label>
                    <select id="city" value={city} onChange={e => setCity(e.target.value)}>
                        <option value="">Selecciona una Ciudad</option>
                        {filters.city.map((cityOption, index) => (
                            <option key={index} value={cityOption}>
                                {cityOption}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="district">Distrito</label>
                    <select id="district" value={district} onChange={e => setDistrict(e.target.value)}>
                        <option value="">Selecciona un Distrito</option>
                        {filters.district.map((districtOption, index) => (
                            <option key={index} value={districtOption}>
                                {districtOption}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="type">Tipo de Espacio</label>
                    <select id="type" value={type} onChange={e => setType(e.target.value)}>
                        <option value="">Selecciona un Tipo de Espacio</option>
                        {filters.type.map((typeOption, index) => (
                            <option key={index} value={typeOption}>
                                {typeOption.replaceAll('_', ' ')}
                            </option>
                        ))}
                    </select>

                    <button className="filter-button" onClick={filterSpaces}>Aplicar Filtro</button>
                    <button className="reset-button" onClick={resetFilters}>Restablecer</button>
                </div>
                <div className="spaces-list">
                    {spaces.length > 0 ? (
                        spaces.map(space => (
                            <SpaceCard key={space.id} space={space} onClick={() => openModal(space)} />
                        ))
                    ) : (
                        <p className="no-spaces-message">No se encontraron espacios. Intenta ajustar los filtros.</p>
                    )}
                </div>
            </div>
            {selectedSpace && <SpaceDetailModal space={selectedSpace} onClose={closeModal} />}
        </div>
    );
}
