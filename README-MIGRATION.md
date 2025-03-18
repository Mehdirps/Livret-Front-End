# Plan de migration des dépendances obsolètes

## Problèmes de compatibilité

Ce projet utilise React 18.3.1, mais certaines dépendances ne sont pas encore compatibles avec cette version :

1. `react-sortable-hoc` - Compatible uniquement avec React 16.x et 17.x
2. `react-snap` - Peut avoir des problèmes de compatibilité avec React 18

## Solutions temporaires

Pour permettre le développement sans interruption, vous pouvez utiliser :

```bash
npm run install:legacy
```

Cette commande utilise le flag `--legacy-peer-deps` pour ignorer les conflits de dépendances lors de l'installation.

## Plan de migration à long terme

### 1. Remplacement de react-sortable-hoc

`react-sortable-hoc` est en cours de remplacement par `@dnd-kit/sortable`, qui est déjà installé.

Migration requise :
- Remplacer les imports de `react-sortable-hoc` par `@dnd-kit/sortable`
- Adapter le code pour utiliser l'API de `@dnd-kit`

Exemple de migration :

```jsx
// Avant (react-sortable-hoc)
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMove } from 'array-move';

const SortableItem = SortableElement(({ value }) => <li>{value}</li>);
const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

// Après (@dnd-kit/sortable)
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function SortableItem({ id, value }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
      }}
    >
      {value}
    </li>
  );
}

function SortableList({ items, onSortEnd }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (active.id !== over.id) {
          const oldIndex = items.findIndex(item => item.id === active.id);
          const newIndex = items.findIndex(item => item.id === over.id);
          onSortEnd({ oldIndex, newIndex });
        }
      }}
    >
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <ul>
          {items.map(item => (
            <SortableItem key={item.id} id={item.id} value={item.value} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
```

### 2. Alternatives pour react-snap

Si `react-snap` pose problème, envisagez l'une de ces alternatives modernes :
- `react-snap-renderer`
- Utiliser Next.js pour le SSR/SSG
- `react-static-site-generator`

## Suivi de la migration

- [ ] Remplacer react-sortable-hoc par @dnd-kit/sortable
- [ ] Tester la compatibilité avec react-snap, remplacer si nécessaire
- [ ] Supprimer le flag --legacy-peer-deps après migration complète
