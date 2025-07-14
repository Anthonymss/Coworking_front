import React, { useEffect, useState } from 'react';
import SpacesService from '../../service/SpacesService';
import SpaceCard from './spaceCard/SpaceCard';
import SpaceDetailModal from './spaceDetail/SpaceDetailModal';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SpacesSection.css';

export default function SpacesSection() {
    const [spaces, setSpaces] = useState([]);
    const [filters, setFilters] = useState({ city: [], district: [], type: [] });
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [type, setType] = useState('');
    const [selectedSpace, setSelectedSpace] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchFilters();
        listSpaces();
    }, []);

    const fetchFilters = () => {
        SpacesService.getFilterSpace()
            .then(response => setFilters(response.data))
            .catch(error => console.error('Error fetching filters:', error));
    };

    const listSpaces = (filtersObj = {}, page = 1, size = 6) => {
        const params = { ...filtersObj, page, size };

        SpacesService.getSpacesForFilter(params)
            .then(response => {
                setSpaces(response.data.spaces || []);
                setTotalPages(response.data.totalPages || 0);
                setTotalItems(response.data.totalItems || 0);
            })
            .catch(error => console.error('Error fetching spaces:', error));
    };

    const filterSpaces = () => {
        const filtersObj = {};
        if (city) filtersObj.city = city;
        if (district) filtersObj.district = district;
        if (type) filtersObj.spaceType = type;

        setCurrentPage(1);
        listSpaces(filtersObj, 1);
    };

    const resetFilters = () => {
        setCity('');
        setDistrict('');
        setType('');
        setCurrentPage(1);
        listSpaces({}, 1);
    };

    const openModal = (space) => setSelectedSpace(space);
    const closeModal = () => setSelectedSpace(null);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const filtersObj = {};
        if (city) filtersObj.city = city;
        if (district) filtersObj.district = district;
        if (type) filtersObj.spaceType = type;

        listSpaces(filtersObj, page);
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const halfMaxVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfMaxVisible);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pages.push(
                <button key="first" className="nav-button" onClick={() => handlePageChange(1)}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> <span>Primero</span>
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <button key="prev" className="nav-button" onClick={() => handlePageChange(currentPage - 1)}>
                        <FontAwesomeIcon icon={faAngleLeft} /> <span>Anterior</span>
                    </button>
                );
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <button key={page} className={`page-button ${page === currentPage ? 'active' : ''}`} onClick={() => handlePageChange(page)}>
                    {page}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <button key="next" className="nav-button" onClick={() => handlePageChange(currentPage + 1)}>
                        <FontAwesomeIcon icon={faAngleRight} /> <span>Siguiente</span>
                    </button>
                );
            }
            pages.push(
                <button key="last" className="nav-button" onClick={() => handlePageChange(totalPages)}>
                    <FontAwesomeIcon icon={faAngleDoubleRight} /> <span>Último</span>
                </button>
            );
        }

        return (
            <div className="pagination">
                {pages}
                <div className="pagination-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                    <span>Página {currentPage} de {totalPages} ({totalItems} espacios)</span>
                </div>
            </div>
        );
    };

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
                            <option key={index} value={cityOption}>{cityOption}</option>
                        ))}
                    </select>

                    <label htmlFor="district">Distrito</label>
                    <select id="district" value={district} onChange={e => setDistrict(e.target.value)}>
                        <option value="">Selecciona un Distrito</option>
                        {filters.district.map((districtOption, index) => (
                            <option key={index} value={districtOption}>{districtOption}</option>
                        ))}
                    </select>

                    <label htmlFor="type">Tipo de Espacio</label>
                    <select id="type" value={type} onChange={e => setType(e.target.value)}>
                        <option value="">Selecciona un Tipo</option>
                        {filters.type.map((typeOption, index) => (
                            <option key={index} value={typeOption}>{typeOption}</option>
                        ))}
                    </select>

                    <button className="filter-button" onClick={filterSpaces}>Filtrar</button>
                    <button className="reset-button" onClick={resetFilters}>Limpiar Filtros</button>
                </div>

                <div className="spaces-content">
                    <div className="spaces-list">
                        {spaces.length > 0 ? (
                            spaces.map((space) => (
                                <SpaceCard key={space.id} space={space} onOpenModal={openModal} />
                            ))
                        ) : (
                            <div className="no-spaces-message">
                                No se encontraron espacios que coincidan con los filtros seleccionados.
                            </div>
                        )}
                    </div>

                    {spaces.length > 0 && (
                        <div className="pagination-wrapper">
                            {renderPagination()}
                        </div>
                    )}
                </div>
            </div>

            {selectedSpace && <SpaceDetailModal space={selectedSpace} onClose={closeModal} />}
        </div>
    );
}
