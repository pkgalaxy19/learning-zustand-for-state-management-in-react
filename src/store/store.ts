import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export interface Habit {
    id: string;
    name: string;
    frequency: "Daily" | "Weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: "Daily" | "Weekly") => void;
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: string) => void;
    fetchHabits: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const useHabitStore = create<HabitState>()(
    devtools(
        persist(
            (set,get) => ({
                habits: [],
                isLoading: false,
                error: null,
                addHabit: (name, frequency) => {
                    set((state) => ({
                        habits: [
                            ...state.habits,
                            {
                                id: Date.now().toString(),
                                name,
                                frequency,
                                completedDates: [],
                                createdAt: new Date().toISOString(),
                            },
                        ],
                    }));
                },
                removeHabit: (id) => {
                    set((state) => ({
                        habits: state.habits.filter((habit) => habit.id !== id),
                    }));
                },
                toggleHabit: (id, date) => {
                    set((state) => ({
                        habits: state.habits.map((habit) => {
                            if (habit.id === id) {
                                if (habit.completedDates.includes(date)) {
                                    return {
                                        ...habit,
                                        completedDates: habit.completedDates.filter(
                                            (completedDate) => completedDate !== date
                                        ),
                                    };
                                } else {
                                    return {
                                        ...habit,
                                        completedDates: [...habit.completedDates, date],
                                    };
                                }
                            }
                            return habit;
                        }),
                    }));
                },
                fetchHabits: async () => {
                    set({ isLoading: true});
                    try{
                        const currentHabits  = get().habits;
                        if(currentHabits.length === 0){
                            set({isLoading: false});
                            return;
                        }

                        await new Promise((resolve) => setTimeout(resolve, 1000));
                    } catch (error) {
                        set({ error: "Failed to fetch habits", isLoading: false});
                    }
                }
            }),

            {
                name: 'habits-local',
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);

export default useHabitStore;
