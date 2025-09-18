<script lang="ts">
  import { notes, searchQuery, currentView, currentNoteId, notesActions } from '$lib/stores/notes';
  import SoftUICard from '$lib/components/SoftUICard.svelte';
  import { Plus, Network } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let filteredNotes = [];
  let currentNote = null;

  // Reactive statements for filtering and current note
  $: filteredNotes = $notes.filter(note => 
    note.title.toLowerCase().includes($searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes($searchQuery.toLowerCase())
  );

  $: currentNote = $currentNoteId ? notesActions.getNoteById($currentNoteId) : null;

  function handleCreateNote() {
    const newNote = notesActions.createNote("New Note");
    currentNoteId.set(newNote.id);
    currentView.set("editor");
  }

  function handleNoteClick(noteId: string) {
    currentNoteId.set(noteId);
    currentView.set("editor");
  }
</script>

<!-- Home View -->
{#if $currentView === 'home'}
  <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
    <div class="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
      <!-- Hero Illustration -->
      <div class="w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6 sm:mb-8">
        <img
          src="/hand-drawn-constellation-emanating-from-profile-he.jpg"
          alt="BrainBloom constellation illustration"
          class="w-full h-full object-contain"
        />
      </div>

      <div class="space-y-3 sm:space-y-4">
        <h1 class="text-3xl sm:text-4xl font-serif text-foreground font-bold text-balance">
          Welcome to BrainBloom
        </h1>
        <p class="text-base sm:text-lg text-muted-foreground text-pretty max-w-lg mx-auto px-4">
          Your digital garden of ideas. Cultivate thoughts, connect concepts, and watch your knowledge bloom.
        </p>
      </div>

      <div class="flex flex-col gap-3 sm:gap-4 justify-center items-center w-full px-4">
        <button
          on:click={() => currentView.set('notes')}
          class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-2xl font-medium transition-all duration-300 w-full sm:w-auto"
        >
          Get Started
        </button>
        <button
          on:click={() => currentView.set('notes')}
          class="border border-border hover:bg-muted px-8 py-3 rounded-2xl font-medium transition-all duration-300 w-full sm:w-auto"
        >
          Sign In
        </button>
      </div>

      <button
        on:click={() => currentView.set('notes')}
        class="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm underline"
      >
        Explore as a guest
      </button>
    </div>
  </div>
{/if}

<!-- Notes View -->
{#if $currentView === 'notes'}
  <div class="min-h-screen bg-background p-3 sm:p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <h1 class="text-2xl sm:text-3xl font-serif text-foreground font-bold">Notes</h1>

          <button
            on:click={handleCreateNote}
            class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl flex items-center gap-2 w-full sm:w-auto justify-center px-6 py-3"
          >
            <Plus class="w-4 h-4" />
            New Note
          </button>
        </div>

        <!-- Search Input -->
        <div class="w-full sm:max-w-md">
          <SoftUICard class="p-4">
            <input
              bind:value={$searchQuery}
              type="text"
              placeholder="Search notes..."
              class="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
            />
          </SoftUICard>
        </div>
      </div>

      <!-- Notes Grid -->
      {#if filteredNotes.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20 sm:mb-24">
          {#each filteredNotes as note, index}
            <SoftUICard 
              class="p-6 space-y-3 cursor-pointer animate-in slide-in-from-bottom-4 fade-in duration-500"
              style="animation-delay: {index * 100}ms"
              onclick={() => handleNoteClick(note.id)}
            >
              <h3 class="font-serif text-lg font-semibold text-foreground text-balance">{note.title}</h3>
              <p class="text-muted-foreground text-sm leading-relaxed text-pretty">{note.excerpt}</p>
              
              <!-- Tags -->
              {#if note.tags.length > 0}
                <div class="flex flex-wrap gap-2">
                  {#each note.tags.slice(0, 3) as tag}
                    <span class="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent-foreground">
                      {tag}
                    </span>
                  {/each}
                  {#if note.tags.length > 3}
                    <span class="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      +{note.tags.length - 3}
                    </span>
                  {/if}
                </div>
              {/if}

              <!-- Metadata -->
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Just now</span>
                {#if note.connections.length > 0}
                  <span>•</span>
                  <div class="flex items-center gap-1">
                    <Network class="w-3 h-3" />
                    <span>
                      {note.connections.length} connection{note.connections.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                {/if}
              </div>
            </SoftUICard>
          {/each}
        </div>
      {:else}
        <!-- Empty State -->
        <div class="text-center py-8 sm:py-12 px-4">
          <div class="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6">
            <img
              src="/gentle-character-watering-a-small-plant-sprout-in-.jpg"
              alt="Gardener watering sprout"
              class="w-full h-full object-contain"
            />
          </div>
          <p class="text-muted-foreground text-base sm:text-lg mb-4">Prêt(e) à planter votre première idée ?</p>
          <button
            on:click={handleCreateNote}
            class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl w-full sm:w-auto px-6 py-3"
          >
            Create Your First Note
          </button>
        </div>
      {/if}
    </div>

    <!-- Floating Orb Menu -->
    <FloatingOrbMenu />
  </div>
{/if}

<!-- Floating Orb Menu Component -->
{#snippet FloatingOrbMenu()}
  <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
    <!-- Main Orb -->
    <SoftUICard
      class="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer relative animate-pulse"
      onclick={() => currentView.set('notes')}
    >
      <div class="relative">
        <div class="w-5 h-5 sm:w-6 sm:h-6 bg-accent-green rounded-full flex items-center justify-center">
          <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
        </div>
        <!-- Notification dot -->
        <div class="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent-peach rounded-full animate-pulse"></div>
      </div>
    </SoftUICard>
  </div>
{/snippet}