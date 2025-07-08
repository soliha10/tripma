'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import increment from '@/app/assets/images/Increment.svg';
import decrement from '@/app/assets/images/inc.svg';
import { useState } from 'react';
export default function OrderForm() {
	const [count, setCount] = useState(1);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [birthDate, setBirthDate] = useState('');

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
						className='w-[200px] py-2  border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
					/>
					<Input
						placeholder='Middle'
						className='w-[200px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
					/>
					<Input
						placeholder='Last name*'
						className='w-[200px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
						onChange={(e) => setLastName(e.target.value)}
					/>
					<Input
						placeholder='Suffix'
						className='w-[200px]  border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
					/>
					<div>
						<Input
							placeholder='Date of birth*'
							className='w-[252px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							required
							onChange={(e) => setBirthDate(e.target.value)}
						/>
						<span className='text-xs text-[#7C8DB0]'>MM/DD/YY</span>
					</div>
				</div>

				<div className='flex flex-wrap gap-6 mb-12'>
					<Input
						placeholder='Email address*'
						className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						placeholder='Phone number*'
						className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<Input
						placeholder='Redress number'
						className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
					/>
					<Input
						placeholder='Known traveller number*'
						className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
						required
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
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={firstName}
						/>
						<Input
							placeholder='Last name*'
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={lastName}
						/>
						<Input
							placeholder='Email address*'
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={email}
						/>
						<Input
							placeholder='Phone number*'
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value={phoneNumber}
						/>
					</div>
				) : (
					<div className='flex flex-wrap gap-6 mb-12'>
						<Input
							placeholder='First name*'
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value=''
						/>
						<Input
							placeholder='Last name*'
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value=''
						/>
						<Input
							placeholder='Email address*'
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
							value=''
						/>
						<Input
							placeholder='Phone number*'
							className='w-[300px] border-[#A1B0CC] bg-white placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] text-[#7C8DB0] '
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
						First Last
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
						firstName && lastName && birthDate && email && phoneNumber
							? 'bg-[#605DEC] text-[#FAFAFA]'
							: 'border-[#7C8DB0] text-[#7C8DB0] border bg-[#cbd4e64c]'
					}  cursor-pointer py-3   rounded text-[18px]  `}
				>
					Select seats
				</Button>
			</div>
		</div>
	);
}
