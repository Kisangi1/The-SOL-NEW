import { connectToDB } from "@/lib/config/db";
import Blog from "@/lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value 
    if (!token) {
        return NextResponse.json({ error: "User is not Authenticated"}, { status: 401 })
    }

    const body = await req.json()
    const { title, author, content, tags, imageUrl } = body 
    if (!title || !author || !content || !tags || !imageUrl) {
        return NextResponse.json({ error: " title, author, content, tags, imageUrl fields are required" }, { status: 400 })
    }
    try {
        await connectToDB()
        const newBlog = await Blog.create({title: title, author: author, content: content, tags: tags, imageUrl: imageUrl})
        return NextResponse.json({ success: true, newBlog }, { status: 201 })
    } catch (error) {
        console.error(error);
        
        return NextResponse.json({ error: error}.error, { status: 500})
    }
}


export async function GET() {
    //  const token = req.cookies.get("token")?.value;
    //  if (!token) {
    //    return NextResponse.json(
    //      { error: "User is not Authenticated" },
    //      { status: 401 }
    //    );
    //  }
    try {
        await connectToDB()
        const blogs = await Blog.find()

        return NextResponse.json({ blogs }, { status: 200})

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }.error, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {
     const token = req.cookies.get("token")?.value;
     if (!token) {
       return NextResponse.json(
         { error: "User is not Authenticated" },
         { status: 401 }
       );
     }
    
    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
        return NextResponse.json({ error: "BLOG ID IS REQUIRED" }, { status: 400 });
    }

    const body = await req.json()
    const { updatedData }  = body

    if (!updatedData) {
        return NextResponse.json({ error: "MISSING BLOG UPDATED DATA" }, { status: 400 });
    }

    // Filter to only allow updates to firstname, lastname, and email
    const allowedUpdates = ['title', 'author', 'tags', 'content', 'imageUrl'];
    const filteredData = {};
    Object.keys(updatedData).forEach(key => {
        if (allowedUpdates.includes(key)) {
            // @ts-expect-error
            filteredData[key] = updatedData[key];
        }
    });

    if (Object.keys(filteredData).length === 0) {
        return NextResponse.json({ error: "NO VALID FIELDS TO UPDATE" }, { status: 400 });
    }

    try {
        await connectToDB()

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 })
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, filteredData, { new: true });
        return NextResponse.json({ updatedBlog }, { status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }.error, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
     const token = req.cookies.get("token")?.value;
     if (!token) {
       return NextResponse.json(
         { error: "User is not Authenticated" },
         { status: 401 }
       );
     }
    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
        return NextResponse.json({ error: "BLOG ID IS REQUIRED" }, { status: 400 });
    }
    try {
        await connectToDB()

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 })
        }


        await blog.deleteOne({ _id: id })
        return NextResponse.json({ success: true, message: "Blog deleted" }, { status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }.error, { status: 500 })
    }

}