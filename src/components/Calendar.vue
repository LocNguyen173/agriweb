<template>
  <div class="calendar-box">
    <div class="calendar-top">
      <h3>Lịch</h3>
      <button class="calendar-btn today-btn" @click="goToToday">Hôm nay</button>
    </div>
    
    <div class="calendar-header">
      <div class="calendar-nav">
        <button class="calendar-btn" :disabled="!canGoPrev()" @click="prevMonth">
          <i class="fas fa-chevron-left"></i>
        </button>
        <select v-model.number="calendar.currentMonth" class="calendar-select">
          <option v-for="(m, idx) in 12" :key="'month-'+idx" :value="idx">
            Tháng {{ idx + 1 }}
          </option>
        </select>
        <select v-model.number="calendar.currentYear" class="calendar-select">
          <option v-for="y in getYearOptions" :key="'year-'+y" :value="y">
            {{ y }}
          </option>
        </select>
        <button class="calendar-btn" :disabled="!canGoNext()" @click="nextMonth">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    
    <div class="calendar-days">
      <div class="weekday">CN</div>
      <div class="weekday">T2</div>
      <div class="weekday">T3</div>
      <div class="weekday">T4</div>
      <div class="weekday">T5</div>
      <div class="weekday">T6</div>
      <div class="weekday">T7</div>
      
      <!-- Render các ngày trống đầu tháng -->
      <div 
        v-for="n in getFirstDayOfWeek(calendar.currentYear, calendar.currentMonth)" 
        :key="'empty-'+n" 
        class="day empty"
      ></div>
      
      <!-- Render các ngày trong tháng -->
      <div
        v-for="day in getDaysInMonth(calendar.currentYear, calendar.currentMonth)"
        :key="'day-'+day"
        class="day"
        :class="{
          'current': isToday(day),
          'has-blog': false,
          'selected': isSelected(day),
          'disabled': isFuture(day)
        }"
        @click="toggleSelectDay(day)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCalendar',
  props: {
    selectedDate: {
      type: String,
      default: null
    }
  },
  emits: ['update:selectedDate'],
  data() {
    return {
      calendar: {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
      }
    }
  },
  computed: {
    getYearOptions() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let y = 2025; y <= currentYear; y++) {
        years.push(y);
      }
      return years;
    }
  },
  methods: {
    prevMonth() {
      if (this.calendar.currentMonth === 0) {
        this.calendar.currentMonth = 11;
        this.calendar.currentYear--;
      } else {
        this.calendar.currentMonth--;
      }
    },
    nextMonth() {
      if (this.calendar.currentMonth === 11) {
        this.calendar.currentMonth = 0;
        this.calendar.currentYear++;
      } else {
        this.calendar.currentMonth++;
      }
    },
    isToday(day) {
      const today = new Date();
      return (
        day === today.getDate() &&
        this.calendar.currentMonth === today.getMonth() &&
        this.calendar.currentYear === today.getFullYear()
      );
    },
    isFuture(day) {
      const date = new Date(this.calendar.currentYear, this.calendar.currentMonth, day);
      const now = new Date();
      return date > now;
    },
    isSelected(day) {
      const dateStr = this.formatDateStr(day);
      return this.selectedDate === dateStr;
    },
    toggleSelectDay(day) {
      if (this.isFuture(day)) return;
      const dateStr = this.formatDateStr(day);
      if (this.selectedDate === dateStr) {
        this.$emit('update:selectedDate', null);
      } else {
        this.$emit('update:selectedDate', dateStr);
      }
    },
    goToToday() {
      const today = new Date();
      this.calendar.currentYear = today.getFullYear();
      this.calendar.currentMonth = today.getMonth();
      this.$emit('update:selectedDate', this.formatDateStr(today.getDate()));
    },
    formatDateStr(day) {
      const m = this.calendar.currentMonth + 1;
      return `${this.calendar.currentYear}-${m.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    },
    getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    getFirstDayOfWeek(year, month) {
      return new Date(year, month, 1).getDay();
    },
    canGoPrev() {
      // Không cho lùi về trước tháng 1/2025
      return (
        this.calendar.currentYear > 2025 ||
        (this.calendar.currentYear === 2025 && this.calendar.currentMonth > 0)
      );
    },
    canGoNext() {
      // Không cho tiến tới tháng tương lai
      const now = new Date();
      return (
        this.calendar.currentYear < now.getFullYear() ||
        (this.calendar.currentYear === now.getFullYear() && this.calendar.currentMonth < now.getMonth())
      );
    },
  }
}
</script>

<style scoped>
.calendar-box {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
}

/* Calendar styles */
.calendar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.calendar-top h3 {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.calendar-header {
  margin-bottom: 15px;
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
}

.calendar-btn.today-btn {
  margin-bottom: 25px;
  background: #4CAF50;
  color: #fff;
  border-radius: 4px;
  padding: 3px 12px;
  margin-left: 8px;
  font-weight: bold;
  border: none;
  transition: background 0.2s;
}

.calendar-btn.today-btn:hover {
  background: #388e3c;
}

.calendar-select {
  margin: 0 5px;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: #fff;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.weekday {
  text-align: center;
  font-weight: bold;
  padding: 5px 0;
  font-size: 0.8rem;
}

.day {
  text-align: center;
  padding: 7px 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.day:hover {
  background-color: #e0e0e0;
}

.day.empty {
  background: none;
  cursor: default;
}

.day.has-blog {
  color: #4CAF50;
  font-weight: bold;
}

/* .day.current {
  background-color: #4CAF50;
  color: white;
} */

.day.selected {
  background-color: #388e3c;
  color: #fff;
  font-weight: bold;
}

.day.disabled {
  color: #bbb;
  background: #f5f5f5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
