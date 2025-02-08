/// Module: smart_contract
module smart_contract::smart_contract{
    use std::string::String;

    const STUDENT_EXISTS :u64= 0;

    public struct Student has copy, store{
        first_name: String,
        last_name : String,
        isMale: bool,
        wallet_address: address
    }

    public struct Students has key{
        id: UID,
        club: String,
        students: vector<Student>,
    }

    fun init(ctx: &mut TxContext){
        let students =  Students{
            id: object::new(ctx),
            club: b"Socsc".to_string(),
            students: vector::empty<Student>(),
        };
        transfer::share_object(students);   
    }

    public fun add_student(students: &mut Students, first_name : String, last_name : String, isMale : bool, ctx: &mut TxContext){
        let mut i = 0;
        let len = vector::length(&students.students);
        let mut exists = false;
        while(i < len){
            let student = vector::borrow(&students.students, i);
            if (student.wallet_address == ctx.sender()){
                exists = true;
                break
            };
            i = i + 1;
        };
        assert!(!exists, STUDENT_EXISTS);
        let student = Student{
            first_name: first_name,
            last_name: last_name,
            isMale: isMale,
            wallet_address: ctx.sender(),
        };
        vector::push_back(&mut students.students, student);
    }
}

