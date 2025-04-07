<template>
  <!-- Booking Progress Tracker -->
  <div class="bg-white py-4 px-4 md:px-8 shadow-sm">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between relative">
        <!-- Progress line -->
        <div class="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>

        <!-- Completed progress -->
        <div
          class="absolute top-1/2 left-0 h-1.5 bg-blue-500 -translate-y-1/2 z-1 rounded-full transition-all duration-500"
          :style="`width: ${progressPercentage}%`"></div>

        <!-- Steps -->
        <div v-for="(step, index) in steps" :key="index" class="relative z-10 flex flex-col items-center cursor-pointer"
          @click="$emit('step-change', index)">
          <!-- Step indicator -->
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
            step.completed ? 'bg-blue-500 text-white shadow-lg' :
              (step.active ? 'bg-white border-2 border-blue-500 text-blue-500' : 'bg-white border-2 border-gray-300 text-gray-400'),
            step.active ? 'scale-110' : ''
          ]">
            <i :class="[step.icon, 'text-lg']"></i>
          </div>

          <!-- Step label -->
          <span :class="[
            'text-xs md:text-sm mt-2 font-medium text-center transition-colors',
            step.active || step.completed ? 'text-blue-600 font-semibold' : 'text-gray-500'
          ]">
            {{ step.label }}
          </span>

          <!-- Tooltip for active step -->
          <div v-if="step.active"
            class="absolute top-full mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-md whitespace-nowrap">
            {{ step.tooltip }}
            <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      default: 1
    }
  },
  computed: {
    progressPercentage() {
      return ((this.currentStep - 1) / (this.steps.length - 1)) * 100
    },
    steps() {
      return [
        {
          label: 'Service Selection',
          icon: 'fas fa-list-alt',
          completed: this.currentStep > 1,
          active: this.currentStep === 1,
          tooltip: 'Choose your service'
        },
        {
          label: 'Details',
          icon: 'fas fa-user-edit',
          completed: this.currentStep > 2,
          active: this.currentStep === 2,
          tooltip: 'Enter your details'
        },
        {
          label: 'Payment',
          icon: 'fas fa-credit-card',
          completed: this.currentStep > 3,
          active: this.currentStep === 3,
          tooltip: 'Secure payment'
        },
        {
          label: 'Confirmation',
          icon: 'fas fa-check-circle',
          completed: this.currentStep > 4,
          active: this.currentStep === 4,
          tooltip: 'Booking confirmed!'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Smooth transitions */
.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

/* Z-index for proper layering */
.z-0 {
  z-index: 0;
}

.z-1 {
  z-index: 1;
}

.z-10 {
  z-index: 10;
}

/* Hover effects for interactive steps */
.cursor-pointer:hover div:first-child {
  transform: scale(1.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.cursor-pointer:hover span {
  color: #3b82f6;
  font-weight: 500;
}
</style>
