import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../../../stores/slices/livretSlice";
const process = require('process');

// Composant d'item sortable
const SortableItem = ({ id, module }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    // Ajoutez ici vos styles existants
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="sortable-item"
    >
      {/* Contenu existant de votre item */}
      {module.name}
      {/* Autres éléments de l'interface utilisateur */}
    </div>
  );
};

const ChangeModulesOrders = ({ modules }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [items, setItems] = useState(
    modules
      .filter(
        (module) =>
          module.type.name !== "homeInfos" && module.type.name !== "placeGroups"
      )
      .sort((a, b) => a.order - b.order)
  );

  // Configuration des capteurs pour le drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Mettre à jour l'ordre et persister les changements
        const newItems = arrayMove(items, oldIndex, newIndex).map(
          (module, index) => ({
            ...module,
            order: index,
          })
        );

        fetch(process.env.REACT_APP_API_URL + "dashboard/update-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            order: newItems,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              dispatch(setError({ error: data.error }));
            } else {
              dispatch(setSuccess({ success: data.message }));
            }
          })
          .catch((error) => {
            dispatch(setError({ error: error }));
          });

        return newItems;
      });
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary col-md-3"
        data-bs-toggle="modal"
        data-bs-target="#modulesOrderModal"
      >
        Changer l'ordre des modules
      </button>
      <div
        className="modal fade"
        id="modulesOrderModal"
        tabIndex="-1"
        aria-labelledby="modulesOrderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modulesOrderModalLabel">
                Changer l'ordre des modules
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={items.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="modules-list">
                    {items.map((module) => (
                      <SortableItem
                        key={module.id}
                        id={module.id}
                        module={module}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeModulesOrders;
