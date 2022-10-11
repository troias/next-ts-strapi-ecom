import React from 'react'
import classes from '../../styles/accountPage.module.scss'
import Link from 'next/link'

type Props = {}

const index = (props: Props) => {
    return (
        <div className={classes.account_page}>
            <div className={classes.account_page_container}>
                <div className={classes.account_page_title}>
                    <h2>My Account</h2>
                </div>
                <div className={classes.account_page_row}>
                    <div className={classes.account_page_col_1}>
                        <div className={classes.account_page_nav}>
                            <ul className={classes.account_page_links}>
                                <li>
                                    <a href="#">Account Details</a>
                                </li>
                                <li>
                                    <a href="#">Address Book</a>
                                </li>
                                <li>
                                    <Link href="/account/orders">My Orders</Link>

                                </li>
                                <li>
                                    <a href="#">Billing Agreements</a>
                                </li>
                                <li>
                                    <a href="#">Recurring Profiles</a>
                                </li>
                                <li>
                                    <a href="#">My Product Reviews</a>
                                </li>
                                <li>
                                    <a href="#">My Tags</a>
                                </li>
                                <li>
                                    <a href="#">My Wishlist</a>
                                </li>
                                <li>
                                    <a href="#">My Applications</a>
                                </li>
                                <li>
                                    <a href="#">Newsletter Subscriptions</a>
                                </li>
                                <li>
                                    <a href="#">My Downloadable Products</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.account_page_col_2}>
                        <div className={classes.account_page_content}>
                            <div className={classes.account_page_form}>
                                <form action="">
                                    <div className={classes.account_page_form_group}>
                                        <label htmlFor="">First Name</label>
                                        <input type="text" />
                                    </div>
                                    <div className={classes.account_page_form_group}>
                                        <label htmlFor="">Last Name</label>
                                        <input type="text" />
                                    </div>
                                    <div className={classes.account_page_form_group}>
                                        <label htmlFor="">Email</label>
                                        <input type="text" />
                                    </div>
                                    <div className={classes.account_page_form_group}>
                                        <label htmlFor="">Current Password</label>
                                        <input type="password" />
                                    </div>
                                    <div className={classes.account_page_form_group}>
                                        <label htmlFor="">New Password</label>
                                        <input type="password" />
                                    </div>
                                    <div className={classes.account_page_form_group}>
                                        <label htmlFor="">Confirm Password</label>
                                        <input type="password" />
                                    </div>
                                    <div className={classes.account_page_form_group}>
                                        <button>Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}






export default index