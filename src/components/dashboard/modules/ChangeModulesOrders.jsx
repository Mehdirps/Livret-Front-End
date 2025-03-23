/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import {useDispatch, useSelector} from 'react-redux';
import {setError, setSuccess} from '../../../stores/slices/livretSlice';

const DragHandle = SortableHandle(() => (
    <td className="move_item"><i className="bi bi-arrows-move"></i></td>
));

const SortableItem = SortableElement(({ module }) => (
    <tr className="module_order_tr">
        <DragHandle />
        <td>{module.order}</td>
        <td>{module.type.title}</td>
    </tr>
));

const SortableContainerComponent = SortableContainer(({ items }) => {
    return (
        <tbody>
            {items.map((module, index) => (
                <SortableItem key={`item-${module.type.name}`} index={index} module={module} />
            ))}
        </tbody>
    );
});

const ChangeModulesOrders = ({ modules }) => {

    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();

    const [sortedModules, setSortedModules] = useState(
        modules.filter((module) => module.type.name !== 'homeInfos' && module.type.name !== 'placeGroups')
            .sort((a, b) => a.order - b.order)
    );

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newOrder = arrayMoveImmutable(sortedModules, oldIndex, newIndex).map((module, index) => ({
            ...module,
            order: index
        }));

        setSortedModules(newOrder);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/update-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                order: newOrder
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.error) {
                dispatch(setError({error: data.error}));
            }else{
                dispatch(setSuccess({success: data.message}));
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
        });
    };

    return (
        <>
            <button type="button" className="btn btn-primary col-md-3" data-bs-toggle="modal" data-bs-target="#modulesOrderModal">
                Changer l'ordre des modules
            </button>
            <div className="modal fade" id="modulesOrderModal" tabIndex="-1" aria-labelledby="modulesOrderModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modulesOrderModalLabel">Changer l'ordre des modules</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Ordre</th>
                                        <th scope="col">Nom du module</th>
                                    </tr>
                                </thead>
                                <SortableContainerComponent items={sortedModules} onSortEnd={onSortEnd} useDragHandle />
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangeModulesOrders;
