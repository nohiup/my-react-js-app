import React from 'react';
import type { Task, User, ChecklistItem } from '../../types';
import { ICONS } from '../../constants';
import { TaskStatus, TaskPriority } from '../../types';
import { Stack } from './ui/stack';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from './ui/card';
import { H1 } from './ui/headings';
import classes from '@/lib/classes';
import { AnimateProgressBar } from './items/AnimateProgressBar';

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
        <div className={cn(classes.squareContainer(8), classes.itemCentralize, classes.textContent, "rounded-full app-background font-bold flex-shrink-0")}>
            {user?.avatar}
        </div>
        <div className="flex-1">
            <Stack row align="center">
                <span className="font-semibold text-sm">{user?.name}</span>
                <span className={classes.textNormalDescription}>{timestamp}</span>
            </Stack>
            <p className={cn(classes.textContent, "mt-1")}>{text}</p>
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
            <div className={cn(classes.squareContainer(6), classes.itemCentralize, classes.textContent, "rounded-full app-background font-bold")}>
                {assignee?.avatar}
            </div>
            <span className="font-medium">{assignee?.name || 'Unassigned'}</span>
        </Stack>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-6">
                <Stack row gap="gap-3" align="center" margin="mb-2">
                    <span className={cn(classes.textContent, "font-medium")}>{task.id}</span>
                    <PriorityTag priority={task.priority} />
                    <StatusTag status={task.status} />
                </Stack>
                <H1>{task.title}</H1>
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
                    <AnimateProgressBar progress={progressPercentage}></AnimateProgressBar>
                </div>
            </section>

            <div className="space-y-8">
                <Card className="app-background border border-primary rounded-lg">
                    <CardTitle className="font-semibold text-lg">
                        Description
                    </CardTitle>
                    <CardContent className="pl-0">
                        <div className="text-title space-y-4 text-sm">
                            <p>{task.description}</p>
                            <div>
                                <h4 className="font-semibold">Requirements:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {task.requirements.map((req, i) => <li key={i}>{req}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Technical Notes:</h4>
                                <p>{task.technicalNotes}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="app-background border border-primary rounded-lg">
                    <CardTitle className="font-semibold text-lg">
                        Checklist
                    </CardTitle>
                    <CardContent className="pl-0">
                        <div className="space-y-3">
                            {task.checklist.map(item => <ChecklistItemComponent key={item.id} item={item} onToggle={handleChecklistToggle} />)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="app-background border border-primary rounded-lg">
                    <CardTitle className="font-semibold text-lg">
                        <Stack row align="center">
                            {React.cloneElement(ICONS.messageSquare, { className: cn(classes.squareContainer(5), "text-medium") })}
                            <span>Comments</span>
                        </Stack>
                    </CardTitle>
                    <CardContent className="pl-0 space-y-6">
                        {task.comments.map(comment => (
                            <CommentComponent
                                key={comment.id}
                                user={users.find(u => u.id === comment.userId)}
                                text={comment.text}
                                timestamp={comment.timestamp}
                            />
                        ))}
                        <div className="mt-6 pt-6 border-t border-primary">
                            <Stack row gap="gap-3" align="center">
                                <div className={cn(classes.squareContainer(8), classes.itemCentralize, classes.textContent, "rounded-full font-bold flex-shrink-0")}>
                                    JD
                                </div>
                                <div className="flex-1">
                                    <Stack className="border border-primary rounded-xl focus-within:border-primary focus-within:ring-1 p-2">
                                        <textarea
                                            placeholder="Add a comment..."
                                            className="w-full p-2 text-sm text-title bg-transparent focus:outline-none resize-none"
                                            rows={3}
                                        ></textarea>
                                        <div className="flex justify-between items-center app-background border-t border-primary p-1">
                                            <Stack row align="center">
                                                <button className="p-1.5 text-normal background-primary-hover rounded-md">
                                                    {React.cloneElement(ICONS.paperclip, { className: "w-4 h-4" })}
                                                </button>
                                            </Stack>
                                            <button className="px-4 py-1.5 background-primary text-contrast text-sm font-semibold rounded-md background-primary-hover disabled:opacity-50 cursor-not-allowed">Comment</button>
                                        </div>
                                    </Stack>
                                </div>
                            </Stack>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
};

export default TaskDetails;