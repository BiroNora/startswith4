<script lang="ts">
	export let showModal: any // boolean

	let dialog: any // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal()
  
  function confirmDelete() {
    onDelete()
    close()
  }
  </script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
  id="modal-example"
>

<article>
    <h3>Az esemény adatai véglegesen törlődnek.</h3>
    <footer>
      <a href="#confirm"
        role="button"
        class="secondary aa"
        data-target="modal-example"
        on:click|self={() => dialog.confirmDelete()}>
        Confirm
      </a>
      <a href="#cancel"
        role="button"
        class="secondary outline"
        data-target="modal-example"
        on:click|self={() => dialog.close()}>
        Cancel
      </a>
    </footer>
  </article>
</dialog>


<style>
  .aa {
    background-color: #32bea6;
    border: 1em solide #32bea6;
  }

  .aa:hover {
    background-color: #0ba38a;
  }

	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
