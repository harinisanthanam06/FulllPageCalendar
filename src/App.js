import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import WeeklyCalendar from "./Components/Weekly";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { grey } from '@mui/material/colors';
import ResponsiveAppBar from "./Components/Layout";

export default function Calendar() {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [type, setType] = useState("monthly");
	const [selectDate, setSelectDate] = useState(currentDate);
	const color = grey[900];
	// const startOfWeek = useAppSelector((state) => state.calendar.week);
	return (
		<><ResponsiveAppBar /><div className="flex gap-10  justify-center  mx-auto  h-screen  sm:flex-row flex-col pl-6 pr-6">
			<div className="w-screen h-96 ">
				<div className="flex flex-row justify-between">
					<div className="flex  items-center gap-3">
						<ButtonGroup variant="contained" aria-label="Basic button group" style={{ backgroundColor: grey[900] }} sx={{ backgroundColor: grey[500], color: grey[200] }}
						>
							<Button style={{ backgroundColor: grey[900] }} sx={{ backgroundColor: grey[500], color: grey[50] }}
								onClick={() => {
									setToday(today.month(today.month() - 1));
								}}
							>
								{"<"}
							</Button>
							<Button style={{ backgroundColor: grey[900] }} sx={{ backgroundColor: grey[500], color: grey[50] }}
								onClick={() => {
									setToday(today.month(today.month() + 1));
								}}
							>
								{">"}
							</Button>
						</ButtonGroup>
						<h1 className="select-none font-semibold">
							{months[today.month()]}, {today.year()}
						</h1>
						<div className="gap-10 flex flex-row p-9 justify-end items-end">
							<ButtonGroup variant="contained" aria-label="Basic button group" style={{ backgroundColor: grey[900] }} sx={{ backgroundColor: grey[500], color: grey[200] }}
							>
								<Button style={{ backgroundColor: grey[900] }} sx={{ backgroundColor: grey[500], color: grey[50] }} onClick={() => {
									setToday(currentDate);
									setType("monthly");
								}}>Today</Button>
								<Button style={{ backgroundColor: grey[900] }} sx={{ backgroundColor: grey[500], color: grey[50] }} onClick={() => {
									setType("monthly");
								}}>Month</Button>
								<Button style={{ backgroundColor: grey[900] }} sx={{ backgroundColor: grey[500], color: grey[50] }} onClick={() => {
									setType("weekly");
								}}>Week</Button>
							</ButtonGroup>
						</div>
					</div>

				</div>

				{type == "weekly" ? <div className="overflow-scroll"><WeeklyCalendar /></div> : <><div className="grid grid-cols-7 pl-6">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div><div className=" grid grid-cols-7 ">
						{generateDate(today.month(), today.year()).map(
							({ date, currentMonth, today }, index) => {
								return (
									<div
										key={index}
										className="p-2 text-center h-14 grid place-content-center text-sm border  border-zinc-900"
									>
										<h1
											className={cn(
												currentMonth ? "" : "text-gray-400",
												today
													? "bg-red-600 text-white"
													: "",
												selectDate
													.toDate()
													.toDateString() ===
													date.toDate().toDateString()
													? "bg-blue-500 text-white"
													: "",
												"h-10 w-10 rounded-full grid place-content-center hover:bg-zinc-300 hover:text-white transition-all cursor-pointer select-none"
											)}
											onClick={() => {
												setSelectDate(date);
											}}
										>
											{date.date()}
										</h1>
									</div>
								);
							}
						)}
					</div></>}

			</div>
		</div></>
	);
}
