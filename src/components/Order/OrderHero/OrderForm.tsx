'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import increment from '@/app/assets/images/Increment.svg';
import decrement from '@/app/assets/images/inc.svg';
import { MouseEvent, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import { useFlight } from '@/context/FlightContext';

type OrderFormProps = {
	firstName: string;
	setFirstName: (value: string) => void;
	lastName: string;
	setLastName: (value: string) => void;
	birthDate: string;
	setBirthDate: (value: string) => void;
	email: string;
	setEmail: (value: string) => void;
	phoneNumber: string;
	setPhoneNumber: (value: string) => void;
	knownTraveller: string;
	setKnownTraveller: (value: string) => void;
};

export default function OrderForm({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	birthDate,
	setBirthDate,
	email,
	setEmail,
	phoneNumber,
	setPhoneNumber,
	knownTraveller,
	setKnownTraveller,
}: OrderFormProps) {
	const [count, setCount] = useState(1);

	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);

	const [isChecked, setIsChecked] = useState(false);

	const router = useRouter();
const {setPassenger} = useFlight()
	const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setPassenger({
			firstName,
			lastName
		})
		router.push('/select-seat');
	};
	return (
		<div className='lg:w-[682px]'>
			<h2 className='text-[#6E7491] text-[18px] font-semibold mb-6 '>
				Passenger 1 (Adult)
			</h2>
			<form action=''>
				<div className='flex flex-wrap gap-6 mb-6'>
					<Input
						onChange={(e) => setFirstName(e.target.value)}
						placeholder='First name*'
						className='w-[200px] py-3  border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
					/>
					<Input
						placeholder='Middle'
						className='w-[200px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
					/>
					<Input
						placeholder='Last name*'
						className='w-[200px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
						onChange={(e) => setLastName(e.target.value)}
					/>
					<Input
						placeholder='Suffix'
						className='w-[200px]  py-3 h-12  border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
					/>
					<div className='flex flex-col gap-[6px]'>
						{/* DATE */}

						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant='default'
									id='date'
									className='w-[252px] py-[10px] rounded appearance-none border items-start justify-start ps-3 border-[#A1B0CC] text-[18px] text-[#7C8DB0]'
								>
									{date ? date.toLocaleDateString() : 'Date of birth*'}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className='w-auto overflow-hidden p-0'
								align='start'
							>
								<Calendar
									mode='single'
									selected={date}
									captionLayout='dropdown'
									onSelect={(selectedDate) => {
										setDate(selectedDate);
										if (selectedDate) {
											setBirthDate(selectedDate.toLocaleDateString());
										}
										setOpen(false);
									}}
								/>
							</PopoverContent>
						</Popover>

						<span className='text-xs inline-block ms-1 text-[#7C8DB0]'>
							MM/DD/YY
						</span>
					</div>
				</div>

				<div className='flex flex-wrap gap-6 mb-12'>
					<Input
						placeholder='Email address*'
						type='email'
						className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder='Phone number*'
						className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<Input
						placeholder='Redress number'
						className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
					/>
					<Input
						placeholder='Known traveller number*'
						className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
						onChange={(e) => setKnownTraveller(e.target.value)}
					/>
				</div>
			</form>

			<h2 className='text-[#6E7491] text-[18px] font-semibold mb-6 '>
				Emergency contact information
			</h2>
			<form action=''>
				<Label className='mb-[28px] '>
					<Input
						type='checkbox'
						className='w-4 h-4'
						onClick={() => setIsChecked(true)}
					/>
					<span className='text-[#6E7491]'>Same as Passenger 1</span>
				</Label>

				{isChecked === true ? (
					<div className='flex flex-wrap gap-6 mb-12'>
						<Input
							placeholder='First name*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={firstName}
						/>
						<Input
							placeholder='Last name*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={lastName}
						/>
						<Input
							placeholder='Email address*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={email}
						/>
						<Input
							placeholder='Phone number*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={phoneNumber}
						/>
					</div>
				) : (
					<div className='flex flex-wrap gap-6 mb-12'>
						<Input
							placeholder='First name*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value=''
						/>
						<Input
							placeholder='Last name*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value=''
						/>
						<Input
							placeholder='Email address*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value=''
						/>
						<Input
							placeholder='Phone number*'
							className='w-[300px]  py-3 border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value=''
						/>
					</div>
				)}
			</form>

			<h2 className='text-[#6E7491] text-[18px] font-semibold mb-[11px]'>
				Bag information
			</h2>
			<p className='text-[#7C8DB0] text-[18px] mb-9 '>
				Each passenger is allowed one free carry-on bag and one personal item.
				First checked bag for each passenger is also free. Second bag check fees
				are waived for loyalty program members. See the
				<span className='text-[#605DEC]'> full bag policy.</span>
			</p>

			<div className='flex items-start'>
				<div className='me-[240px] flex flex-col'>
					<strong className='text-[#7C8DB0] text-[17px] font-semibold inline-block mb-[15px] '>
						Passenger 1
					</strong>
					<span className='text-[#6E7491] text-[17px] font-semibold  '>
						{firstName} {lastName}
					</span>
				</div>

				<div>
					<span className='text-[#7C8DB0] text-[17px] font-semibold inline-block mb-[15px] '>
						Checked bags
					</span>
					<div className='flex items-center gap-5 mb-[74px]'>
						<Button
							type='button'
							onClick={() => setCount(count > 1 ? count - 1 : count)}
							className='w-8 h-8 hover:bg-transparent  '
						>
							<Image src={decrement} alt='minus' />
						</Button>
						<span className='text-[#6E7491] text-[18px]'>{count}</span>
						<Button
							type='button'
							onClick={() => setCount(count + 1)}
							className='w-8 h-8 hover:bg-transparent '
						>
							<Image src={increment} alt='add' />
						</Button>
					</div>
				</div>
			</div>

			<div className='flex items-center justify-start gap-6 '>
				<Button className='text-[#605DEC] border border-[#605DEC] w-[180px] text-[18px] rounded py-3  inline-block hover:bg-[#605DEC] lg:text-[18px] hover:text-white cursor-pointer'>
					Save and Close
				</Button>
				<Button
					className={`w-[138px]  ${
						firstName &&
						lastName &&
						birthDate &&
						email &&
						phoneNumber &&
						knownTraveller
							? 'bg-[#605DEC] text-[#FAFAFA]'
							: 'border-[#7C8DB0] text-[#7C8DB0] border bg-[#cbd4e64c] cursor-not-allowed opacity-100 '
					}  cursor-pointer py-3   rounded text-[18px]  `}
					disabled={
						!(firstName && lastName && birthDate && email && phoneNumber)
					}
					type='button'
					onClick={handleNavigate}
				>
					Select seats
				</Button>
			</div>
		</div>
	);
}
