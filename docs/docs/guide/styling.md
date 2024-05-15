# Styling
The library contains only critical styles to layout the modals container and modal content. It can be easily customized using custom css.

## HTML tree
```html
<div class="o-modals">
  <div class="o-modal">
    ...
  </div>
  <div class="o-modal is-active">
    ...
  </div>

  <div class="o-modals-bg"></div>
</div>
```

### .o-modals
Modals is root elements that holds entire modal tree.

You can for example change duration of all animations on this element or change its z-index if modals are being overlay-ed by other elements.

```scss
.o-modals {
  --o-transition-duration: .6s;

  &.v-enter-from,
  &.v-leave-to {
    transition: opacity var(--o-transition-duration);
    // animation
  }
}
```

### .o-modals-bg
Background is an element that covers entire screen so the content of the page does not interrupt you when modal is displayed. You can change its color or filters.

```scss
.o-modals {
  .o-modals-bg {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
}
```

### .o-modal
Modal is a wrapper element that holds your modal component.

You could for example add extra padding, so the content of modal never touches edge of window.
```scss
.o-modal {
  padding: 16px;

  &.v-enter-from,
  &.v-leave-to {
    transition: opacity var(--o-transition-duration);
    // animation
  }
}
```
