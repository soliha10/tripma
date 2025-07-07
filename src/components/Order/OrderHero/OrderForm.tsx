import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import increment from '@/app/assets/images/Increment.svg';
import decrement from '@/app/assets/images/inc.svg';
export default function OrderForm() {
	return (
		<div className='lg:w-[682px]'>
			<h2>Passenger 1 (Adult)</h2>
			<form action=''>
				<div>
					<Input placeholder='First name*' />
					<Input placeholder='Middle' />
					<Input placeholder='Last name*' />
					<Input placeholder='Suffix' />
					<div>
						<Input placeholder='Date of birth*' />
						<span>MM/DD/YY</span>
					</div>
				</div>
				<div>
					<Input placeholder='Email address*' />
					<Input placeholder='Phone number*' />
					<Input placeholder='Redress number' />
					<Input placeholder='Known traveller number*' />
				</div>
			</form>

			<h2>Emergency contact information</h2>
			<form action=''>
				<Label>
					<Input />
					<span>Same as Passenger 1</span>
				</Label>

				<div>
					<Input placeholder='First name*' />
					<Input placeholder='Last name*' />
					<Input placeholder='Email address*' />
					<Input placeholder='Phone number*' />
				</div>
			</form>

			<h2>Bag information</h2>
			<p>
				Each passenger is allowed one free carry-on bag and one personal item.
				First checked bag for each passenger is also free. Second bag check fees
				are waived for loyalty program members. See the
				<span>full bag policy.</span>
			</p>

			<div>
				<div>
					<strong>Passenger 1</strong>
					<span>First Last</span>
				</div>

				<div>
					<span>Checked bags</span>
					<div>
						<Button>
							<Image src={decrement} alt='minus' />
						</Button>
						<span>1</span>
						<Button>
							<Image src={increment} alt='add' />
						</Button>
					</div>
				</div>
			</div>
			<div>
				<Button className='text-[#605DEC] border border-[#605DEC] w-[180px] text-[18px] rounded py-3 ms-auto inline-block hover:bg-[#605DEC] lg:text-[18px] hover:text-white cursor-pointer'>
					Save and Close
				</Button>
				<Button>Select seats</Button>
			</div>
		</div>
	);
}
