import React from 'react';
import type { Task, User, ChecklistItem } from '../../types';
import { ICONS } from '../../constants';
import { TaskStatus, TaskPriority } from '../../types';
import { Stack } from './ui/stack';
import { cn } from '@/lib/utils';

interface TaskDetailsProps {
    task: Task;
    users: User[];
    onTaskUpdate: (task: Task) => void;
}

const StatusTag: React.FC<{ status: TaskStatus }> = ({ status }) => {
    const color = status === TaskStatus.InProgress
        ? { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'text-blue-500' }
        : { bg: 'bg-slate-100', text: 'text-slate-700', icon: 'text-slate-500' };

    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded ${color.bg} ${color.text}`}>
            {status === TaskStatus.InProgress && <span className={`${color.icon} flex items-center justify-center`}>
                {React.cloneElement(ICONS.clock, { className: "w-4 h-4" })} {/* giảm size 1 chút */}
            </span>}
            {status}
        </span>
    );
};

const PriorityTag: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
    const color = priority === TaskPriority.High
        ? { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'text-orange-500' }
        : { bg: 'bg-slate-100', text: 'text-slate-700', icon: 'text-slate-500' };

    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded ${color.bg} ${color.text}`}>
            {priority === TaskPriority.High && <span className={`${color.icon} flex items-center justify-center`}>
                {React.cloneElement(ICONS.trendingUp, { className: "w-4 h-4" })}
            </span>}
            {priority}
        </span>
    );
};

const InfoItem: React.FC<{ label: string; value: React.ReactNode; }> = ({ label, value }) => (
    <div>
        <div className="text-xs text-normal">{label}</div>
        <div className="text-sm text-title mt-1">{value}</div>
    </div>
);

const ChecklistItemComponent: React.FC<{ item: ChecklistItem; onToggle: (id: string) => void; }> = ({ item, onToggle }) => (
    <Stack row align="center" gap="gap-3" className="cursor-pointer group" onClick={() => onToggle(item.id)}>
        <span className={cn("w-5 h-5", item.completed ? "text-green-500" : "text-slate-400 group-hover:text-slate-600")}>
            {item.completed ? ICONS.checkCircle : ICONS.circle}
        </span>
        <span className={cn("flex-1 text-sm", item.completed ? 'text-normal line-through' : 'text-title')}>
            {item.text}
        </span>
    </Stack>
);

const CommentComponent: React.FC<{ user: User | undefined; text: string; timestamp: string; }> = ({ user, text, timestamp }) => (
    <Stack row gap="gap-3" align="start">
        <div className="w-8 h-8 rounded-full app-background flex items-center justify-center font-bold text-slate-500 text-sm flex-shrink-0">
            {user?.avatar}
        </div>
        <div className="flex-1">
            <Stack row align="center">
                <span className="font-semibold text-sm">{user?.name}</span>
                <span className="text-xs text-normal">{timestamp}</span>
            </Stack>
            <p className="text-sm text-normal mt-1">{text}</p>
        </div>
    </Stack>
);

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, users, onTaskUpdate }) => {
    const assignee = users.find(u => u.id === task.assigneeId);
    const completedChecklistItems = task.checklist.filter(item => item.completed).length;
    const progressPercentage = task.checklist.length > 0 ? (completedChecklistItems / task.checklist.length) * 100 : 0;

    const handleChecklistToggle = (itemId: string) => {
        const updatedChecklist = task.checklist.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        onTaskUpdate({ ...task, checklist: updatedChecklist });
    };

    const assigneeValue = (
        <Stack row align="center">
            <div className="w-6 h-6 rounded-full app-background flex items-center justify-center font-bold text-normal text-xs">
                {assignee?.avatar}
            </div>
            <span className="font-medium">{assignee?.name || 'Unassigned'}</span>
        </Stack>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-6">
                <Stack row gap="gap-3" align="center" margin="mb-2">
                    <span className="text-sm font-medium text-normal">{task.id}</span>
                    <PriorityTag priority={task.priority} />
                    <StatusTag status={task.status} />
                </Stack>
                <h1 className="text-3xl font-bold text-title">{task.title}</h1>
                <p className="text-normal mt-1">{task.shortDescription}</p>
            </header>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-primary">
                <InfoItem label="Assignee" value={assigneeValue} />
                <InfoItem label="Due Date" value={<span className="font-medium">{task.dueDate}</span>} />
                <InfoItem label="Time Logged" value={<span className="font-medium">{`${task.timeLogged} / ${task.timeTotal}`}</span>} />
                <InfoItem label="Sprint" value={<span className="font-medium">{task.sprint}</span>} />
            </section>

            <section className="my-6">
                <Stack row justify="justify-between" margin="mb-2" align="center">
                    <label className="text-sm font-semibold text-title">Progress</label>
                    <span className="text-sm text-normal">{completedChecklistItems} of {task.checklist.length} completed</span>
                </Stack>
                <div className="w-full app-background rounded-full h-2">
                    <div className="background-primary h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </section>

            <div className="space-y-8">
                <div className="p-5 app-background border border-primary rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-3">Description</h3>
                    <div className="text-title space-y-4 text-sm">
                        <p>{task.description}</p>
                        <div>
                            <h4 className="font-semibold mb-2">Requirements:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {task.requirements.map((req, i) => <li key={i}>{req}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Technical Notes:</h4>
                            <p>{task.technicalNotes}</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 app-background border border-primary rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Checklist</h3>
                    <div className="space-y-3">
                        {task.checklist.map(item => <ChecklistItemComponent key={item.id} item={item} onToggle={handleChecklistToggle} />)}
                    </div>
                </div>

                <div className="p-5 app-background border border-primary rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                        {/* Fix: Removed unnecessary and problematic `as React.ReactElement` cast. */}
                        {React.cloneElement(ICONS.messageSquare, { className: "w-5 h-5 text-normal" })}
                        <span>Comments</span>
                    </h3>
                    <div className="space-y-6">
                        {task.comments.map(comment => (
                            <CommentComponent
                                key={comment.id}
                                user={users.find(u => u.id === comment.userId)}
                                text={comment.text}
                                timestamp={comment.timestamp}
                            />
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-primary">
                        <Stack row gap="gap-3" align="center">
                            <div className="w-8 h-8 rounded-full app-background flex items-center justify-center font-bold text-normal text-sm flex-shrink-0">
                                JD
                            </div>
                            <div className="flex-1">
                                <div className="border border-primary rounded-lg focus-within:border-primary focus-within:ring-1">
                                    <textarea
                                        placeholder="Add a comment..."
                                        className="w-full p-2 text-sm text-title bg-transparent rounded-t-lg focus:outline-none resize-none"
                                        rows={3}
                                    ></textarea>
                                    <div className="flex justify-between items-center p-2 border-t border-primary app-background">
                                        <Stack row align="center">
                                            <button className="p-1.5 text-normal background-primary-hover rounded-md">
                                                {/* Fix: Removed unnecessary and problematic `as React.ReactElement` cast. */}
                                                {React.cloneElement(ICONS.paperclip, { className: "w-4 h-4" })}
                                            </button>
                                        </Stack>
                                        <button className="px-4 py-1.5 background-primary text-contrast text-sm font-semibold rounded-md background-primary-hover disabled:opacity-50 cursor-not-allowed">Comment</button>
                                    </div>
                                </div>
                            </div>
                        </Stack>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TaskDetails;